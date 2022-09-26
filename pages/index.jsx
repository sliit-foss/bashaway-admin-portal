
import { useState, useRef } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Layout from '../components/layout'
import { useEffectOnce } from '@hooks/index'
import { getQuestionSubmissions, getRegistrationInfo } from '@services/dashboard'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [registrationInfo, setRegistrationInfo] = useState(null)
    const [submissionInfo, setSubmissionInfo] = useState(null)

    const userStatRef = useRef();

    useEffectOnce(() => {
        getRegistrationInfo().then((res) => {
            setRegistrationInfo(res.data)
        })
        getQuestionSubmissions().then((res) => {
            setSubmissionInfo(res.data)
        })
    }, [])

    return (

        <Layout title="Bashaway | Dashboard">
            <div className="w-screen min-h-screen flex flex-col justify-start items-center pt-32">
                <div className='w-11/12 h-1/2 justify-start flex flex-col lg:flex-row p-12 gap-x-12'>
                    <div className='flex flex-col justify-center items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm p-12 mb-12 lg:mb-0 rounded-lg transition duration-300 cursor-default'>
                        <span className='text-white text-5xl font-semibold'>{registrationInfo?.total_registrations || 0}</span>
                        <span className='text-white text-2xl text-center'>Registered Teams</span>
                    </div>
                    <div className='w-full h-1/2'>
                        {registrationInfo && <Bar
                            ref={userStatRef}
                            data={{
                                labels: registrationInfo?.university_counts?.map((university) => university.name),
                                datasets: [
                                    {
                                        label: "Registrations Per University",
                                        backgroundColor: registrationInfo?.university_counts?.map((university) => `#ffffff`),
                                        data: registrationInfo?.university_counts?.map((obj) => obj.count)
                                    }
                                ],
                            }}
                            height={250}
                            options={{ maintainAspectRatio: false, backgroundColor: 'rgba(53, 162, 235, 0.5)' }}

                        />}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
