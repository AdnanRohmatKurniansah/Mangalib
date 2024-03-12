import { Skeleton } from "@chakra-ui/react"

interface Props {
  skeletonArray: number[];
}

const RecommendedListLoader: React.FC<Props> = ({ skeletonArray }) => {
  return (
    <div className="manga-list border p-4 border-gray-100 bg-white rounded-md">
    <h1 className="text-xl font-bold mb-4">Kamu pasti suka komik ini</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skeletonArray.map((i) => (
            <Skeleton className="min-h-[240px] rounded-md" key={i} />
          ))}
      </div>
   </div>
  )
}

export default RecommendedListLoader