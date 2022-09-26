import { useState } from 'react'
import { Modal, Button } from 'flowbite-react'
import { toast } from "react-toastify";
import { Input } from '@components/common';
import { addUser, updateUser } from '@services/user';

const initialFormData = {
    name: "",
    email: ""
}

const UserModal = ({ user, show, setShow, refresh = () => { } }) => {

    const [formData, setFormData] = useState(user || initialFormData)

    const onSubmit = async () => {
        if (user) {
            await updateUser(user._id, {
                name: formData.name,
            }).then((res) => {
                if (res.success) {
                    toast.success('User updated successfully')
                }
            })
        } else {
            await addUser(formData).then((res) => {
                if (res.success) {
                    toast.success('User added successfully')
                    setFormData(initialFormData)
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
            size="2xl"
            onClose={() => {
                setShow(false)
            }}
        >
            <Modal.Header color="white">{user ? 'Update' : 'Add'} User</Modal.Header>
            <Modal.Body>
                <form>
                    <div className="flex flex-col gap-y-4 mb-4">
                        <Input placeholder="User Name" name="name" value={formData.name} className="h-12 sm:h-14 light" theme="light" onChange={onChange} />
                        {!user && <Input placeholder="Email" name="email" value={formData.email} className="h-12 sm:h-14 light" theme="light" onChange={onChange} />}
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
