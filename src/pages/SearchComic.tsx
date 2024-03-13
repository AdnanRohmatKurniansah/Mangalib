import { Link, useParams } from "react-router-dom"
import Layout from "../layouts/Layout"
import { Image, Text } from "@chakra-ui/react"
import { searchComic } from "../libs/api"
import { useQuery } from "@tanstack/react-query"
import { RecommendedManga } from "../utils/types"
import ResultNotFound from "./_components/ResultNotFound"
import SearchLoader from "../components/skeleton/SearchLoader"

const SearchComic = () => {
  const { keyword } = useParams<{ keyword: string }>()
  const numberOfSkeletons = 4;
  const skeletonArray = Array.from({ length: numberOfSkeletons }, (_, i) => i + 1);


  const { data: searchResult, isLoading, isError } = useQuery<RecommendedManga[], Error>({
    queryKey: ['search', keyword],
    queryFn: async () => {
      if (keyword) {
        const response = await searchComic(keyword)
        return response.data
      }
    },
  })

  if (isLoading) return (
    <SearchLoader skeletonArray={skeletonArray}/>
  )

  if (!searchResult || isError) {
    if (!keyword) {
      return <ResultNotFound keyword="" />
    }

    return <ResultNotFound keyword={keyword} />
  }

  return (
    <Layout>
      <div className="search-result first-letter:border p-3 mb-5 border-gray-100 bg-white rounded-md">
        <h1 className="text-xl font-bold">Hasil pencarian {keyword}</h1>
      </div>
      <div className="result border p-4 border-gray-100 bg-white rounded-md">
          {searchResult.map((search, i) => (
            <div key={i} className="comic border-b-2 pb-3 border-gray-200 grid grid-cols-1 md:grid-cols-2 mb-3 gap-4">
              <Link state={search.desc}  to={`/comic${search.endpoint}`}>
                <Image className="w-full max-h-200px min-h-[230px] md:min-h-[200px]" src={search.image} alt={search.title} />
              </Link>
              <div className="p-2">
              <Text fontWeight={600}>{search.title}</Text>
              <div className="category mt-2">
                <Text>{search.type}</Text>
              </div>
              <Text className="mt-2 mb-4">{search.desc}</Text>
              <Link state={search.desc} className="bg-orange-400 font-bold text-white mb-3 hover:bg-orange-500 px-4 py-2 rounded-md text-center" to={`/comic${search.endpoint}`}>
                Read
              </Link>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  )
}

export default SearchComic