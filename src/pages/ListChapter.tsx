import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import Popular from '../components/Popular'
import Layout from '../layouts/Layout'
import { useQuery } from '@tanstack/react-query'
import { ChapterList } from '../utils/types'
import { Card, Image, Box, Spinner, Button } from '@chakra-ui/react'
import { chapterList } from '../libs/api'
import ListChapterLoader from '../components/skeleton/ListChapter'

const ListChapter = () => {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const [lastChapter, setLastChapter] = useState<number>(0)
  const [loadedImages, setLoadedImages] = useState(0)
  const stateFromDetailComic = location.state

  const lastChapterPart = stateFromDetailComic ? stateFromDetailComic.split('/')[stateFromDetailComic.split('/').length - 2] : null

  const { data: chapter, isLoading, isError } = useQuery<ChapterList, Error>({
    queryKey: ['chapterList', slug],
    queryFn: async () => {
      if (slug) {
        const response = await chapterList(slug)
        return response.data
      }
    },
  })

  const pathname = window.location.pathname
  const partsPath = pathname.split('/')
  const lastPart = partsPath[partsPath.length - 2] 
  
  const getChapterInfo = (chapterString: string, lastChapterString: string) => {
    const regex = /^(.*-chapter-)(\d+(?:\.\d+)?)/; // Regex untuk mencocokkan nomor chapter dengan atau tanpa pecahan
    const matchChapter = chapterString.match(regex);
    const matchLastChapter = lastChapterString ? lastChapterString.match(regex) : null;
  
    if (matchChapter) {
      const chapterName = matchChapter[1];
      const chapterNumber = parseFloat(matchChapter[2]); // Menggunakan parseFloat untuk mengambil nomor chapter dengan atau tanpa pecahan
      const lastChapterNumber = matchLastChapter == null ? null : parseFloat(matchLastChapter[2]);
      if (lastChapter > 1) {
        return { chapterName, chapterNumber, lastChapterNumber: lastChapter };
      }
      return { chapterName, chapterNumber, lastChapterNumber };
    } else {
      return { chapterName: null, chapterNumber: 0, lastChapterNumber: 0 };
    }
  }
  

  const { chapterName, chapterNumber, lastChapterNumber } = getChapterInfo(lastPart, lastChapterPart)

  useEffect(() => {
    setLastChapter(lastChapterNumber || 0)
    if (isError) {
      console.error("Error fetching chapter list")
    }
  }, [isError, lastChapterNumber])


  if (isLoading) return (
    <ListChapterLoader />
  )

  if (!chapter || isError) {
    return <div>No data</div>
  }

  const getNextChapterNumber = () => {
    if (chapterNumber < lastChapter) {
      let nextChapterNumber;
      if (chapterNumber % 1 === 0) {
        // Jika nomor chapter adalah bilangan bulat
        nextChapterNumber = chapterNumber + 1;
      } else {
        // Jika nomor chapter adalah pecahan
        const decimalPart = Number((chapterNumber % 1).toFixed(1)); // Mengambil angka desimal
        if (decimalPart < 0.9) {
          // Jika angka desimal kurang dari 0.9, tambahkan 0.1
          nextChapterNumber = chapterNumber + 0.1;
        } else {
          // Jika angka desimal sudah 0.9, tambahkan 1 untuk melompat ke chapter berikutnya
          nextChapterNumber = Math.ceil(chapterNumber);
        }
      }
      return nextChapterNumber.toFixed(1); // Mengembalikan nomor chapter dengan satu digit desimal
    }
    return null; // Jika nomor chapter sudah mencapai yang terakhir
  }
  
  const getPrevChapterNumber = () => {
    if (chapterNumber > 1) {
      let prevChapterNumber;
      if (chapterNumber % 1 === 0) {
        // Jika nomor chapter adalah bilangan bulat
        prevChapterNumber = chapterNumber - 1;
      } else {
        // Jika nomor chapter adalah pecahan
        const decimalPart = Number((chapterNumber % 1).toFixed(1)); // Mengambil angka desimal
        if (decimalPart > 0.1) {
          // Jika angka desimal lebih besar dari 0.1, kurangi 0.1
          prevChapterNumber = chapterNumber - 0.1;
        } else {
          // Jika angka desimal sudah 0.1, kurangi 1 untuk melompat ke chapter sebelumnya
          prevChapterNumber = Math.floor(chapterNumber);
        }
      }
      return prevChapterNumber.toFixed(1); // Mengembalikan nomor chapter dengan satu digit desimal
    }
    return null; // Jika nomor chapter sudah di awal
  }

  const addSpinner = () => (
    <div className="flex my-5 justify-center">
      <Spinner 
        thickness='5px'
        speed='0.65s'
        emptyColor='orange.200'
        color='orange.500'
        size='xl' />
    </div>
  )

  return (
    <Layout>
      <div className="mt-10">
        <Popular />
        <div className='list-chapter mt-10'>
          <Card className='p-3'>
            <h1 className='text-2xl font-bold border-b-2 border-gray-200 pb-2'>{chapter.title}</h1>
            <div className="mt-5">
              {chapter.image.map((img, i) => (
                <Box key={i}>
                  {i >= loadedImages && addSpinner()}
                  <Image className='w-full' onLoad={() => setLoadedImages(i + 1)} src={img} alt={img} />
                </Box>
              ))}
            </div>
            <div className="mt-5 gap-4 flex justify-center">
              {chapterNumber > 1 && (
                <Link to={`/comic/ch/${chapterName}${getPrevChapterNumber()}/`}>
                  <Button>Chapter Sebelumnya</Button>
                </Link>
              )}
              {chapterNumber < lastChapter && (
                <Link to={`/comic/ch/${chapterName}${getNextChapterNumber()}/`}>
                  <Button>Chapter Selanjutnya</Button>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default ListChapter