import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react'

export const Card = ({ card, hidden = false }) => {
  const bg = useColorModeValue('white', 'gray.700')
  const color = card?.suit === '♥' || card?.suit === '♦' ? 'red.500' : 'black'
  
  if (hidden) {
    return (
      <Box
        w="60px"
        h="90px"
        bg={bg}
        border="2px solid"
        borderColor="gray.300"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundImage="repeating-linear-gradient(45deg, #f0f0f0 0, #f0f0f0 10px, #e0e0e0 10px, #e0e0e0 20px)"
      />
    )
  }

  return (
    <Box
      w="60px"
      h="90px"
      bg={bg}
      border="2px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={2}
      position="relative"
    >
      <Text fontSize="lg" color={color} position="absolute" top={1} left={2}>
        {card.value}
      </Text>
      <Text fontSize="xl" color={color} position="absolute" bottom={1} right={2}>
        {card.suit}
      </Text>
    </Box>
  )
}

export const Hand = ({ cards = [], hideFirst = false }) => {
  return (
    <HStack spacing={-2}>
      {cards.map((card, index) => (
        <Card key={`${card.suit}-${card.value}-${index}`} card={card} hidden={hideFirst && index === 0} />
      ))}
    </HStack>
  )
}