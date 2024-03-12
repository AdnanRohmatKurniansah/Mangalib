import { Card, Skeleton } from '@chakra-ui/react'
import Layout from '../../layouts/Layout'
import Popular from '../Popular'

const ListChapterLoader = () => {
  return (
    <Layout>
      <div className="mt-10">
        <Popular />
        <div className='list-chapter mt-10'>
          <Card className='p-3'>
            <Skeleton className="w-[400px] h-[40px] rounded-md" />
            <div className="mt-2">
                <Skeleton className="max-w-full h-[900px] rounded-md" />
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default ListChapterLoader