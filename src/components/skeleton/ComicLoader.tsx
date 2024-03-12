import Layout from '../../layouts/Layout'
import { Card, Skeleton, Text } from '@chakra-ui/react'

interface Props {
  skeletonArray: number[];
}

const ComicLoader: React.FC<Props> = ({ skeletonArray }) => {
  return (
    <Layout>
      <div className="detail-comic mt-10">
        <Card className="p-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="img">
                <Skeleton className="w-full h-[350px] rounded-md" />
            </div>
            <div className="detail col-span-2">
                <Skeleton className="w-full h-[350px] rounded-md" />
            </div>
          </div>
        </Card>
        <Card className="p-3 mt-5">
          <Text className="text-xl font-bold mb-3">Daftar chapter</Text>
          <div className="bg-gray-200 rounded-md p-2">
            <h3>Nomor chapter</h3>
          </div>
          <div className="mt-2">
            {skeletonArray.map((i) => (
                <Skeleton className="min-h-[40px] mb-2 rounded-md" key={i} />
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default ComicLoader