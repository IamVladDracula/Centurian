import { Box, SimpleGrid, Image, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const GameCard = ({ title, image, path }) => {
  const navigate = useNavigate()
  const bg = useColorModeValue('white', 'gray.800')
  
  return (
    <VStack
      p={4}
      bg={bg}
      borderRadius="lg"
      boxShadow="sm"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ transform: 'scale(1.02)', boxShadow: 'md' }}
      onClick={() => navigate(path)}
    >
      <Box 
        w="100%" 
        h="150px" 
        borderRadius="md" 
        overflow="hidden"
      >
        <Image 
          src={image} 
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
    </VStack>
  )
}

export const GameGrid = ({ games }) => {
  return (
    <SimpleGrid 
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
      spacing={6}
      py={8}
    >
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </SimpleGrid>
  )
}