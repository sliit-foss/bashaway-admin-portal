import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Pagination } from 'flowbite-react'
import Layout from '@components/layout'
import { Button, Filters, Sorts, NoRecords } from '@components/common'
import { Submission } from '@components/submissions'
import { getAllSubmissions } from '@services/submission'
import { submissionFilters, submissionSorts } from '@filters'
import { useEffectOnce } from '@hooks/index'
import { getAllUsers } from '@services/user'
import { setCompetitors } from '@store/user'
import { isEmpty } from 'lodash'
import { downloadFile } from 'helpers'

const Submissions = () => {

  const router = useRouter()

  const { id: questionId } = router.query

  const dispatch = useDispatch()

  const { competitors } = useSelector((state) => state.user);

  const [submissionRes, setSubmissionRes] = useState(null)
  const [page, setPage] = useState(1)
  const [filterQuery, setFilterQuery] = useState('')
  const [sortQuery, setSortQuery] = useState('')

  useEffect(() => {
    questionId && getAllSubmissions(`${filterQuery}filter[question]=${questionId}`, sortQuery, page).then((res) => {
      setSubmissionRes(res.data)
    })
  }, [questionId, page, filterQuery, sortQuery])

  useEffectOnce(() => {
    isEmpty(competitors) && getAllUsers(`filter[role]=GROUP`).then((res) => {
      dispatch(setCompetitors(res.data))
    })
  })

  return (
    <Layout title="Bashaway | Submissions">
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        {submissionRes && (
          <>
            <div className="w-10/12 flex flex-col justify-center items-start mt-24 mb-5">
              <Filters filters={submissionFilters.map((filter) => {
                if (filter.key == 'user') filter.options = competitors?.map((competitor) => ({ key: competitor._id, label: competitor.name }))
                return filter
              })} setFilterQuery={setFilterQuery} />
              <Sorts sorts={submissionSorts} setSortQuery={setSortQuery} />
            </div>
            <div className='w-10/12 flex justify-end items-center mb-6'>
              <Button
                className="px-12 py-2 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 bg-white focus:ring-black focus:ring-opacity-10"
                onClick={() => {
                  getAllSubmissions(`${filterQuery}filter[question]=${questionId}`).then((res) => {
                    res.data.forEach((submission) => downloadFile(submission.link))
                  })
                }}
              >
                Download All
              </Button>
            </div>
            <div className="w-10/12 min-h-screen flex flex-col justify-between items-center mb-16">
              <div className="w-full h-full flex flex-col justify-start items-center gap-y-6">
                {submissionRes.docs?.length > 0 ? (
                  submissionRes.docs?.map((submission) => {
                    return <Submission submission={submission} />
                  })
                ) : (
                  <NoRecords text="No Submissions Made Yet" className="mt-12" />
                )}
              </div>
              <div className="w-full flex justify-end items-center mt-4 md:mt-0">
                <Pagination
                  currentPage={page}
                  onPageChange={(newPage) => {
                    setPage(newPage)
                  }}
                  showIcons={true}
                  totalPages={submissionRes.totalPages}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Submissions
