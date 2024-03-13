import React from 'react'
import Layout from '../../layouts/Layout'
import { Skeleton } from '@chakra-ui/react'

interface Props {
    skeletonArray: number[];
  }

const SearchLoader: React.FC<Props> = ({ skeletonArray }) => {
  return (
    <Layout>
      <div className="search-result first-letter:border p-3 mb-5 border-gray-100 bg-white rounded-md">
        <Skeleton className="w-[320px] h-[35px] rounded-md" />
      </div>
      <div className="result border p-4 border-gray-100 bg-white rounded-md">
        {skeletonArray.map((i) => (
          <div key={i} className="comic border-b-2 pb-3 border-gray-200 grid grid-cols-1 md:grid-cols-2 mb-3 gap-4">
            <Skeleton className='w-full min-h-[230px] md:min-h-[200px]' />
            <div>
              <Skeleton className='w-full min-h-[230px] md:min-h-[200px]'/>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default SearchLoader