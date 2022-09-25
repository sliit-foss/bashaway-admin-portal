
import { useState } from 'react'
import Layout from '../components/layout'
import { useEffectOnce } from '@hooks/index'
import { getAllUsers } from '@services/user'

const Dashboard = () => {
    const [usersRes, setUsersRes] = useState(null)
    useEffectOnce(() => {
        getAllUsers().then((res) => {
          setUsersRes(res.data)
        })
    }, [])

    return (
        <Layout title="Bashaway | Dashboard">
            <div className="w-screen min-h-screen flex flex-col justify-center items-center">
                
            </div>
        </Layout>
    )
}

export default Dashboard
