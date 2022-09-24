import { useEffect, useState } from 'react'
import { Pagination } from 'flowbite-react'
import { Question } from '@components/questions'
import Layout from '@components/layout'
import { getAllQuestions } from '@services/question'

const Questions = () => {
    const [questionRes, setQuestionRes] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getAllQuestions(page).then((res) => {
            setQuestionRes(res.data)
        })
    }, [page])

    return (
        <Layout title="Bashaway | Questions">
            <div className="w-screen min-h-screen flex flex-col justify-center items-center">
                {
                    questionRes && <div className="w-10/12 min-h-screen flex flex-col justify-between items-center mt-24 mb-12">
                        {questionRes.docs?.map((question) => {
                            return (
                                <div className="w-full flex justify-center items-center">
                                    <Question question={question} />
                                </div>
                            )
                        })}
                        <div className="w-full flex justify-end items-center mt-4">
                            <Pagination
                                currentPage={page}
                                onPageChange={(newPage) => {
                                    setPage(newPage)
                                }}
                                showIcons={true}
                                totalPages={questionRes.totalPages}
                            />
                        </div>
                    </div>
                }
            </div>
        </Layout>
    )
}

export default Questions
