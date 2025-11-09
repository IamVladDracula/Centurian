import { useState, useEffect } from 'react'
import { Box, Button, Grid, Heading, Text, VStack, HStack, SimpleGrid, useToast } from '@chakra-ui/react'
import { useAccount, useBalance } from 'wagmi'
import { motion } from 'framer-motion'

const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
]

const getNumberColor = (number) => {
  if (number === 0) return 'green'
  return number % 2 === 0 ? 'black' : 'red'
}

const getBetType = (number) => {
  if (number === 0) return 'zero'
  return {
    color: number % 2 === 0 ? 'black' : 'red',
    odd: number % 2 === 1,
    even: number % 2 === 0,
    high: number > 18,
    low: number <= 18,
    dozen: Math.ceil(number / 12),
    column: (number - 1) % 3 + 1
  }
}

export const Roulette = () => {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const toast = useToast()

  const [gameState, setGameState] = useState('waiting') // waiting, spinning, ended
  const [selectedBets, setSelectedBets] = useState([])
  const [spinResult, setSpinResult] = useState(null)
  const [wheelRotation, setWheelRotation] = useState(0)

  const handlePlaceBet = (betType, amount) => {
    if (!address) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your Base wallet to play',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    setSelectedBets([...selectedBets, { type: betType, amount }])
  }

  const handleSpin = () => {
    if (selectedBets.length === 0) {
      toast({
        title: 'No bets placed',
        description: 'Place at least one bet before spinning',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setGameState('spinning')
    const result = ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)]
    const newRotation = wheelRotation + 1440 + (360 * (result / 37)) // Multiple spins + final position
    setWheelRotation(newRotation)

    setTimeout(() => {
      setSpinResult(result)
      calculateWinnings(result)
      setGameState('ended')
    }, 3000)
  }

  const calculateWinnings = (result) => {
    const resultType = getBetType(result)
    let totalWinnings = 0

    selectedBets.forEach(bet => {
      let won = false
      let multiplier = 0

      switch (bet.type) {
        case 'number':
          if (bet.number === result) {
            won = true
            multiplier = 35
          }
          break
        case 'color':
          if (bet.color === resultType.color) {
            won = true
            multiplier = 2
          }
          break
        case 'odd':
          if (resultType.odd) {
            won = true
            multiplier = 2
          }
          break
        case 'even':
          if (resultType.even) {
            won = true
            multiplier = 2
          }
          break
        case 'high':
          if (resultType.high) {
            won = true
            multiplier = 2
          }
          break
        case 'low':
          if (resultType.low) {
            won = true
            multiplier = 2
          }
          break
        case 'dozen':
          if (resultType.dozen === bet.dozen) {
            won = true
            multiplier = 3
          }
          break
        case 'column':
          if (resultType.column === bet.column) {
            won = true
            multiplier = 3
          }
          break
      }

      if (won) {
        totalWinnings += bet.amount * multiplier
      }
    })

    return totalWinnings
  }

  const handleNewGame = () => {
    setGameState('waiting')
    setSelectedBets([])
    setSpinResult(null)
  }

  return (
    <Box maxW="1200px" mx="auto" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Roulette</Heading>
        
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          {/* Game Area */}
          <Box p={6} bg="gray.700" borderRadius="lg">
            {/* Wheel Animation */}
            <Box
              as={motion.div}
              height="300px"
              width="300px"
              borderRadius="full"
              margin="0 auto"
              background="url('/roulette-wheel.png')"
              backgroundSize="cover"
              animate={{
                rotate: wheelRotation
              }}
              transition={{
                duration: 3,
                ease: "easeOut"
              }}
            />

            {/* Betting Board */}
            <SimpleGrid columns={3} spacing={4} mt={8}>
              {Array.from({ length: 36 }, (_, i) => i + 1).map(number => (
                <Button
                  key={number}
                  onClick={() => handlePlaceBet('number', { number })}
                  colorScheme={getNumberColor(number)}
                >
                  {number}
                </Button>
              ))}
            </SimpleGrid>

            {/* Betting Options */}
            <HStack mt={4} spacing={4} wrap="wrap">
              <Button onClick={() => handlePlaceBet('color', { color: 'red' })} colorScheme="red">
                Red
              </Button>
              <Button onClick={() => handlePlaceBet('color', { color: 'black' })} colorScheme="gray">
                Black
              </Button>
              <Button onClick={() => handlePlaceBet('odd')} colorScheme="purple">
                Odd
              </Button>
              <Button onClick={() => handlePlaceBet('even')} colorScheme="purple">
                Even
              </Button>
              <Button onClick={() => handlePlaceBet('high')} colorScheme="blue">
                1-18
              </Button>
              <Button onClick={() => handlePlaceBet('low')} colorScheme="blue">
                19-36
              </Button>
            </HStack>

            {/* Action Buttons */}
            <HStack mt={6} spacing={4} justify="center">
              {gameState === 'waiting' && (
                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={handleSpin}
                  isDisabled={selectedBets.length === 0}
                >
                  Spin
                </Button>
              )}
              {gameState === 'ended' && (
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={handleNewGame}
                >
                  New Game
                </Button>
              )}
            </HStack>

            {spinResult !== null && (
              <Text
                color="white"
                fontSize="2xl"
                textAlign="center"
                mt={4}
              >
                Result: {spinResult} {getNumberColor(spinResult)}
              </Text>
            )}
          </Box>

          {/* Info Panel */}
          <VStack
            p={6}
            bg="gray.700"
            borderRadius="lg"
            spacing={4}
            align="stretch"
          >
            <Text color="white">
              Connected: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No'}
            </Text>
            <Text color="white">
              Balance: {balance ? balance.formatted : '0'} ETH
            </Text>
            <Box>
              <Text color="white" fontWeight="bold" mb={2}>
                Current Bets:
              </Text>
              {selectedBets.map((bet, index) => (
                <Text key={index} color="white">
                  {bet.type}: {JSON.stringify(bet)}
                </Text>
              ))}
            </Box>
          </VStack>
        </Grid>
      </VStack>
    </Box>
  )
}