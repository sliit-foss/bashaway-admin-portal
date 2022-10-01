import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { IoStar } from 'react-icons/io5'
import ReactMarkdown from 'react-markdown'
import Layout from '@components/layout'
import { Button } from '@components/common'
import { QuestionModal } from '@components/questions';
import { getQuestionById } from '@services/question'

export default function QuestionView() {

  const router = useRouter()

  const { id } = router.query

  const [question, setQuestion] = useState(null)

  const [showQuestionModal, setShowQuestionModal] = useState(false)

  const refresh = () => {
    getQuestionById(id).then((res) => {
      setQuestion(res.data)
    })
  }

  useEffect(() => {
    id && refresh()
  }, [id])

  return (
    <Layout>
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        {question && (
          <div className="w-full min-h-screen flex flex-col justify-start items-center mt-28 mb-12">
            <div className="w-10/12 flex justify-start items-center mb-4">
              <span className="text-white text-2xl mr-4">Challenge</span>
              <div className="h-0.5 w-full bg-white" />
            </div>
            <div className="w-10/12  bg-card/30 shadow-md border border-[#ffffff26] rounded-md overflow-hidden my-4 px-3 py-6 md:px-6 md:py-8">
              <div className="w-full grid md:grid-cols-6 2xl:grid-cols-5 items-center">
                <div className="md:col-span-3">
                  <div className="flex items-center ">
                    <IoStar className="text-white" />
                    <h3 className="ml-2 text-md md:text-lg text-white">{question.name}</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 2xl:grid-cols-4 text-xs gap-y-6 text ml-6 mt-4 text-gray-400">
                    <p>Complexity - {question.difficulty}</p>
                    <p>Maximum Score - {question.max_score}</p>
                    <p>Teams Submitted - {question.total_submissions}</p>
                    <p>Constraints - {question.constraints?.join(',')}</p>
                  </div>
                </div>
                <div className="w-full flex mt-4 ml-6 items-center md:justify-end mr-8 sm:ml-6 sm:mt-4 md:col-span-3 2xl:col-span-2 md:mt-0 md:ml-0 ">
                  <Button
                    className={`px-6 py-2 mr-4 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 ${question.total_submissions === 0 ? '' : 'bg-white'}  focus:ring-black focus:ring-opacity-10`}
                    disabled={question.total_submissions === 0}
                    onClick={() => {
                      router.push(`/questions/${question._id}/submissions`)
                    }}
                  >
                    View Submissions
                  </Button>
                  <Button
                    className="px-6 py-2 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 bg-white focus:ring-black focus:ring-opacity-10"
                    onClick={() => {
                      setShowQuestionModal(true)
                    }}
                  >
                    Modify Question
                  </Button>
                </div>
              </div>
              <div className="w-11/12 flex justify-start items-center my-6 pl-6">
                <ReactMarkdown className="invert markdown">{question.description}</ReactMarkdown>
              </div>
              <div className="w-10/12 flex mt-10 mb-4 ml-6 justify-start items-center">
                <a href={question.codebase_url} download>
                  <Button className="px-6 py-2 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 bg-white focus:ring-black focus:ring-opacity-10">Download Attachments</Button>
                </a>
              </div>
            </div>
            <QuestionModal question={question} show={showQuestionModal} setShow={setShowQuestionModal} refresh={refresh}/>
          </div>
        )}
      </div>
    </Layout>
  )
}
