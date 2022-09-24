import { IoStar } from 'react-icons/io5'
import Link from 'next/link'

const Question = ({ question }) => {
  return (
    <div className="w-full items-center bg-card/30 shadow-md border border-[#ffffff26] rounded-md overflow-hidden my-4 px-3 py-6 md:px-6 md:py-8 grid md:grid-cols-5">
      <div className="md:col-span-3">
        <div className="flex items-center ">
          <IoStar className="text-white" />
          <h3 className="ml-2 text-md md:text-lg text-white">{question.name}</h3>
        </div>
        <div className="grid sm:grid-cols-3 text-xs text ml-6 mt-4 text-gray-400">
          <p>Complexity - {question.difficulty}</p>
          <p>Maximum Score - {question.max_score}</p>
          <p>Constraints - {question.constraints.join(',')}</p>
        </div>
      </div>
      <div className="flex mt-4 ml-6 items-center md:justify-end mr-8 sm:ml-6 sm:mt-4 md:col-span-2 md:mt-0 md:ml-0 ">
        <Link href={`/questions/${question._id}`}>
          <span className="px-6 py-2 font-semibold sm:text-xl cursor-pointer focus:outline-none focus:ring focus:ring-offset-1 bg-white text-black rounded-md hover:bg-primary hover:text-white focus:ring-black focus:ring-opacity-20 transition-all duration-300">
            View Question
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Question
