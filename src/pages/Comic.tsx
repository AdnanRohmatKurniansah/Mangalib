import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { detailComic } from "../libs/api"
import { DetailComic } from "../utils/types"
import Layout from "../layouts/Layout"
import { Card, Image, Text } from "@chakra-ui/react"
import ComicLoader from "../components/skeleton/ComicLoader"

const Comic = () => {
  const { slug } = useParams<{ slug: string }>()
  const numberOfSkeletons = 8;
  const skeletonArray = Array.from({ length: numberOfSkeletons }, (_, i) => i + 1);

  const { data: detail, isLoading, isError } = useQuery<DetailComic, Error>({
    queryKey: ['detail', slug],
    queryFn: async () => {
      if (slug) {
        const response = await detailComic(slug)
        return response.data
      }
    },
  })

  useEffect(() => {
    if (isError) {
      console.error("Error fetching detail")
    }
  }, [isError])

  if (isLoading) return (
    <ComicLoader skeletonArray={skeletonArray} />
  )

  if (!detail || isError) {
    return <div>No data</div>
  }

  return (
    <Layout>
      <div className="detail-comic mt-10">
        <Card className="p-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="img">
              <Image className="w-2/3 mx-auto md:w-full" height={'350px'} src={detail.thumbnail} />
            </div>
            <div className="detail col-span-2">
              <ul>
                <li className="flex items-center mb-2">
                  <span className="w-1/3 text-left font-bold">Judul Indonesia</span>
                  <span>:</span>
                  <span className="ml-3 w-2/3">{detail.title}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-1/3 text-left font-bold">Jenis komik</span>
                  <span>:</span>
                  <span className="ml-3 w-2/3">{detail.type}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-1/3 text-left font-bold">Konsep cerita</span>
                  <span>:</span>
                  <span className="ml-3 w-2/3">{Array.from(new Set(detail.genre)).join(', ')}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-1/3 text-left font-bold">Author</span>
                  <span>:</span>
                  <span className="ml-3 w-2/3">{detail.author}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-1/3 text-left font-bold">Status</span>
                  <span>:</span>
                  <span className="ml-3 w-2/3">{detail.status}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-1/3 text-left font-bold">Rating</span>
                  <span>:</span>
                  <span className="ml-3 w-2/3">{detail.rating}</span>
                </li>
                {/* <li className="flex items-center mb-2">
                  <span className="w-1/3 text-left font-bold">Deskripsi</span>
                  <span>: {.desc}</span>
                </li> */}
              </ul>
            </div>
          </div>
        </Card>
        <Card className="p-3 mt-5">
          <Text className="text-xl font-bold mb-3">Daftar chapter</Text>
          <div className="bg-gray-200 rounded-md p-2">
            <h3>Nomor chapter</h3>
          </div>
          {
            detail.chapter_list.map((chap, i) => (
            <div key={i} className="chapter border-b p-2 border-gray-200">
              <Link to={`/comic${chap.endpoint}`} state={detail.chapter_list[0].endpoint}>
               <span className="text-sm">{chap.name}</span >
              </Link>
            </div>
            ))
          }
        </Card>
      </div>
    </Layout>
  )
}

export default Comic