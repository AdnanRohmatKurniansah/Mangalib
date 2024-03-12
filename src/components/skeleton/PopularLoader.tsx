import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
  skeletonArray: number[];
}

const PopularLoader: React.FC<Props> = ({ skeletonArray }) => {
  return (
    <div className="popular mt-14">
      <Box as="button" className="bg-orange-400 rounded-md text-xl mb-7 px-3 py-2 text-white">
        <Text fontWeight={900}>Manga popular</Text>
      </Box>
      <div className="loader flex overflow-x-scroll justify-between gap-6 p-2">
        {skeletonArray.map((i) => (
            <Box key={i} width={'100%'} height={'100%'}>
                <Avatar size="2xl" border="2px" borderColor="white" src="/images/blank.jpg" />
            </Box>
        ))}
      </div>
    </div>
  )
}

export default PopularLoader