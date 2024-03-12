import { Card, Image, Text } from "@chakra-ui/react"
import { manhwaList } from "../libs/api"
import { Manhwa } from "../utils/types"
import { useQuery } from "@tanstack/react-query"
import ManhwaLoader from "./skeleton/MahwaLoader"
import { Link } from "react-router-dom"

const useManhwa = () => useQuery<Manhwa[]>({
  queryKey: ['manhwadata'],
  queryFn: manhwaList,
  staleTime: 300000,
  retry: false,
})

const ManhwaList = () => {
  const { data: manhwadata, error, isLoading } = useManhwa();
  const numberOfSkeletons = 8;
  const skeletonArray = Array.from({ length: numberOfSkeletons }, (_, i) => i + 1);

  if (isLoading) return (
    <ManhwaLoader skeletonArray={skeletonArray} />
  )
 
  if (error || !manhwadata) return null;

  const manhwaToShow = manhwadata.slice(0, 20);

  return (
    <div className="manhwa-list border p-4 mt-14 border-gray-100 bg-white rounded-md">
      <h1 className="text-xl font-bold mb-4">Suka baca manhwa?</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {manhwaToShow.map((manhwa, i) => (
            <Card key={i}>
              <Image className="min-h-32 max-h-32" src={manhwa.image} alt={manhwa.title} />
              <div className="p-2">
                <Text fontWeight={600}>{manhwa.title.length > 15 ? manhwa.title.substr(0, 16) + "..." : manhwa.title}</Text>
              </div>
              <Link className="bg-orange-400 mx-3 font-bold text-white mb-3 hover:bg-orange-500 p-2 rounded-md text-center" to={`/comic${manhwa.endpoint}`}>
                Read
              </Link>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default ManhwaList