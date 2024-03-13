import Layout from '../../layouts/Layout'
import { Text } from '@chakra-ui/react'

const ResultNotFound = ({ keyword }: {keyword: string}) => {
  return (
    <Layout>
      <div className="search-result first-letter:border p-3 mb-5 border-gray-100 bg-white rounded-md">
        <h1 className="text-xl font-bold">Hasil pencarian {keyword}</h1>
      </div>
      <div className="result border p-4 border-gray-100 bg-white rounded-md">
        <div className="flex justify-center min-h-80 items-center">
            <Text className='text-2xl text-orange-300 font-extrabold'>Tidak ada komik dengan judul {keyword}</Text>
        </div>
      </div>
    </Layout>
  )
}

export default ResultNotFound