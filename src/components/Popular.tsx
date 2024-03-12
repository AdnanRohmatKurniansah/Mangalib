import { Box, Avatar, Text } from "@chakra-ui/react"
import { PopularManga } from "../utils/types";
import { popularManga } from "../libs/api";
import { useQuery } from "@tanstack/react-query";
import PopularLoader from "./skeleton/PopularLoader";
import { Link } from "react-router-dom";

const usePopular = () => useQuery<PopularManga[]>({
  queryKey: ['popularData'],
  queryFn: popularManga,
  staleTime: 300000,
  retry: false,
})

const Popular = () => {
  const { data: popularData, error, isLoading } = usePopular();
  const numberOfSkeletons = 8;
  const skeletonArray = Array.from({ length: numberOfSkeletons }, (_, i) => i + 1);

  if (isLoading) return (
    <PopularLoader skeletonArray={skeletonArray} />
  )
 
  if (error || !popularData) return null;

  return (
    <div className="popular mt-14">
      <Box as="button" className="bg-orange-400 rounded-md text-xl mb-7 px-3 py-2 text-white">
        <Text fontWeight={900}>Manga popular</Text>
      </Box>
      <div className="list flex overflow-x-scroll justify-between gap-6 p-2">
        {window.location.pathname === '/' ? (
          popularData.slice(0, 20).map((popular, i) => (
            <Box key={i} width={'100%'} height={'100%'}>
              <Link to={`/comic${popular.endpoint}`}>
                <Avatar size="2xl" border="2px" borderColor="white" src={popular.image} />
                <Text className="mt-3 font-bold text-md">{popular.title.length > 10 ? popular.title.substr(0, 11) + "..." : popular.title}</Text>
              </Link>
            </Box>
          ))
        ) : (
          popularData.map((popular, i) => (
            <Box key={i} width={'100%'} height={'100%'}>
              <Link to={`/comic${popular.endpoint}`}>
                <Avatar size="2xl" border="2px" borderColor="white" src={popular.image} />
                <Text className="mt-3 font-bold text-md">{popular.title.length > 10 ? popular.title.substr(0, 11) + "..." : popular.title}</Text>
              </Link>
            </Box>
          ))
        )}
      </div>
    </div>
  )
}

export default Popular