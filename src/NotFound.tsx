import { Text } from '@chakra-ui/react'
import Layout from './layouts/Layout'

const NotFound = () => {
  return (
    <Layout>
        <div className="flex justify-center min-h-80 items-center">
            <Text className='text-3xl text-orange-300 font-extrabold'>404 - Halaman tidak ditemukan</Text>
        </div>
    </Layout>
  )
}

export default NotFound