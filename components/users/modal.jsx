import { useState } from 'react'
import { Modal, Button } from 'flowbite-react'
import { toast } from "react-toastify";
import { Dropdown, Input } from '@components/common';
import { enabledFilters } from '@filters';
import { pick } from 'lodash';
import { addUser, updateUser } from '@services/user';

const initialFormData = {
    name: "",
    description: "",
    difficulty: "",
    constraints: "",
    max_score: null,
    enabled: "",
    creator_lock: "",
    codebase_url: ""
}

const UserModal = ({ user, show, setShow, refresh = () => { } }) => {

    const [formData, setFormData] = useState(user || initialFormData)

    const onSubmit = async () => {
        if (user) {
            await updateUser(user._id, pick(formData, Object.keys(initialFormData))).then((res) => {
                if (res.success) {
                    toast.success('User updated successfully')
                }
            })
        } else {
            await addUser(formData).then((res) => {
                if (res.success) {
                    toast.success('User added successfully')
                }
            })
        }
        setShow(false)
        refresh()
    }

    const onChange = (e, key) => {
        setFormData({
            ...formData,
            [key || e.target.name]: e.target.value
        })
    }

    return (
        <Modal
            show={show}
            size="7xl"
            onClose={() => {
                setShow(false)
            }}
        >
            <Modal.Header color="white">{user ? 'Update' : 'Add'} User</Modal.Header>
            <Modal.Body>
                <form>
                    <div className="flex flex-col gap-y-4 mb-4">
                        <div className='w-full flex justify-center items-center gap-x-4'>
                            <Input placeholder="Question Name" name="name" value={formData.name} wrapperclasses="w-full md:w-1/2" className="h-12 sm:h-14" theme="light" onChange={onChange} />
                            <Input placeholder="Codebase URL" name="codebase_url" value={formData.codebase_url} wrapperclasses="w-full md:w-1/2" className="h-12 sm:h-14" theme="light" onChange={onChange} />
                        </div>
                        <div className='w-full flex flex-col md:flex-row justify-center items-center gap-y-4 md:gap-y-0 gap-x-4'>
                            <Dropdown filterkey="enabled" placeholder="Status" options={enabledFilters} wrapperclasses="w-full md:w-4/12" className="w-full h-12 sm:h-14" theme="light" value={formData.enabled} onChange={onChange} />
                            <Input placeholder="Maximum Score" name="max_score" value={formData.max_score} type="number" wrapperclasses="w-full md:w-4/12" className="w-full h-12 sm:h-14" theme="light" onChange={onChange} />
                        </div>
                        <Input placeholder="Constraints (Comma Separated)" name="constraints" value={formData.constraints} className="h-12 sm:h-14" theme="light" onChange={onChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={onSubmit}
                >
                    {user ? 'Update' : 'Add'}
                </Button>
                <Button
                    color="gray"
                    onClick={() => {
                        setShow(false)
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserModal
