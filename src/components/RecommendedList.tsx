import { Card, Image, Text } from "@chakra-ui/react"
import { recommendedManga } from "../libs/api"
import { RecommendedManga } from "../utils/types"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import RecommendedListLoader from "./skeleton/RecommendedListLoader"

const useRecommended = () => useQuery<RecommendedManga[]>({
  queryKey: ['recommendedData'],
  queryFn: recommendedManga,
  staleTime: 300000,
  retry: false,
})

const RecommendedList = () => {
  const { data: recommendedData, error, isLoading } = useRecommended();
  const numberOfSkeletons = 8;
  const skeletonArray = Array.from({ length: numberOfSkeletons }, (_, i) => i + 1);

  if (isLoading) return (
   <RecommendedListLoader skeletonArray={skeletonArray} />
  )

  if (error || !recommendedData) return null;

  return (
    <div className="manga-list border p-4 border-gray-100 bg-white rounded-md">
      <h1 className="text-xl font-bold mb-4">Kamu pasti suka komik ini</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedData.map((recommended, i) => (
            <Card key={i}>
              <Image className="min-h-32 max-h-32" src={recommended.image} alt={recommended.title} />
              <div className="p-2">
              <Text fontWeight={600}>{recommended.title.length > 15 ? recommended.title.substr(0, 16) + "..." : recommended.title}</Text>
                  <div className="category mt-2">
                    <Text>{recommended.type}</Text>
                  </div>
              </div>
              <Link state={recommended.desc} className="bg-orange-400 mx-3 font-bold text-white mb-3 hover:bg-orange-500 p-2 rounded-md text-center" to={`/comic${recommended.endpoint}`}>
                Read
              </Link>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default RecommendedList