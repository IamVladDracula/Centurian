import { Box, Heading, Text, SimpleGrid, VStack, Icon, useNavigate } from '@chakra-ui/react'
import { FaChessKing, FaDice, FaCoins } from 'react-icons/fa'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const GameCard = ({ title, description, icon, path, isNew }) => {
  const navigate = useNavigate()
  
  return (
    <MotionBox
      bg="background.tertiary"
      p={6}
      borderRadius="xl"
      cursor="pointer"
      position="relative"
      overflow="hidden"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(path)}
    >
      <VStack spacing={4} align="start">
        <Box
          bg="brand.300"
          p={3}
          borderRadius="lg"
          color="white"
        >
          <Icon as={icon} boxSize={6} />
        </Box>
        <VStack align="start" spacing={2}>
          <Heading size="md" color="white">
            {title}
            {isNew && (
              <Box
                as="span"
                ml={2}
                px={2}
                py={1}
                bg="green.500"
                borderRadius="full"
                fontSize="xs"
                fontWeight="bold"
              >
                NEW
              </Box>
            )}
          </Heading>
          <Text color="gray.400" fontSize="sm">
            {description}
          </Text>
        </VStack>
      </VStack>

      {/* Decorative gradient */}
      <Box
        position="absolute"
        top={0}
        right={0}
        width="150px"
        height="150px"
        bg="brand.300"
        opacity={0.1}
        filter="blur(30px)"
        borderRadius="full"
        transform="translate(50%, -50%)"
      />
    </MotionBox>
  )
}

const games = [
  {
    id: 'blackjack',
    title: 'Blackjack',
    description: 'Classic casino card game. Get as close to 21 as possible without going over.',
    path: '/blackjack',
    icon: FaChessKing,
  },
  {
    id: 'poker',
    title: 'Texas Hold\'em',
    description: 'The most popular poker variant. Play against the computer in this multiplayer simulation.',
    path: '/poker',
    icon: FaChessKing,
    isNew: true,
  },
  {
    id: 'roulette',
    title: 'Roulette',
    description: 'European Roulette with multiple betting options and realistic wheel animation.',
    path: '/roulette',
    icon: FaCoins,
  }
]

export const Home = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading 
          size="2xl" 
          bgGradient="linear(to-r, brand.300, purple.400)" 
          bgClip="text"
        >
          Welcome to BaseCasino
        </Heading>
        <Text mt={4} fontSize="lg" color="gray.400">
          Experience the thrill of casino games with Base blockchain integration.
          Play with virtual currency and compete on the global leaderboard.
        </Text>
      </Box>

      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={6}
        pt={8}
      >
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </SimpleGrid>
    </VStack>
  )
}