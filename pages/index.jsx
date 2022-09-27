
import { useState, useRef } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Layout from '../components/layout'
import { useEffectOnce } from '@hooks/index'
import { getQuestionSubmissions, getRegistrationInfo } from '@services/dashboard'
import Link from 'next/link';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
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
            <div className="w-screen min-h-screen flex flex-col justify-start items-center pt-20">
                <div className='w-11/12 h-1/2 justify-start flex flex-col lg:flex-row p-8 gap-x-12'>
                    <Link href="/users">
                        <div className='flex flex-col justify-center items-center bg-white/5 hover:bg-transparent border-transparent hover:border hover:border-white/10 backdrop-blur-sm p-12 mb-12 lg:mb-0 rounded-lg transition duration-300 cursor-pointer'>
                            <span className='text-white text-5xl font-semibold'>{registrationInfo?.total_registrations || 0}</span>
                            <span className='text-white text-2xl text-center'>Registered Teams</span>
                        </div>
                    </Link>
                    <div className='w-full h-1/2'>
                        {registrationInfo && <Bar
                            ref={userStatRef}
                            data={{
                                labels: registrationInfo?.university_counts?.map((university) => university.name),
                                datasets: [
                                    {
                                        label: "Registrations Per University",
                                        backgroundColor: registrationInfo?.university_counts?.map(() => '#fff'),
                                        data: registrationInfo?.university_counts?.map((obj) => obj.count)
                                    }
                                ],
                            }}
                            height={250}
                            options={{ maintainAspectRatio: false, }}

                        />}
                    </div>
                </div>
                <div className='w-11/12 h-1/2 justify-end flex flex-col lg:flex-row px-8 gap-x-12'>
                    <span className='text-white text-2xl'>Total Submissions: {submissionInfo?.reduce((acc, curr) => acc + curr.submission_count, 0)}</span>
                </div>
                <div className='w-11/12 h-1/2 justify-start flex flex-col lg:flex-row p-8 gap-x-12'>
                    <div className='w-full h-1/2'>
                        {submissionInfo && <Line

                            data={{
                                labels: submissionInfo?.map((obj) => obj.question?.name),
                                datasets: [
                                    {
                                        label: "Submissions Per Question",
                                        backgroundColor: submissionInfo?.map(() => "#fff"),
                                        borderColor: submissionInfo?.map(() => "#fff"),
                                        data: submissionInfo?.map((obj) => obj.submission_count)
                                    }
                                ],
                            }}
                            height={450}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            maxRotation: 90,
                                            minRotation: 20,
                                        },
                                        grid: {
                                            color: "#ffffff10",
                                            lineWidth: 1,

                                        }
                                    },
                                    y: {

                                        grid: {
                                            color: "#ffffff10",
                                            lineWidth: 1,

                                        }
                                    },
                                },
                            }}
                        />}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
