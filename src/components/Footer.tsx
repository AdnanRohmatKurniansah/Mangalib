import {
  Box,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box
      className='mt-20'
      bg={useColorModeValue('white', 'whitesmoke')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          Mangalib
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2024 ARK. All rights reserved
        </Text>
      </Box>
    </Box>
  )
}
