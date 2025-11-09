import { useState, useEffect } from 'react'
import { Box, Button, Grid, Heading, Text, VStack, HStack, useToast } from '@chakra-ui/react'
import { useAccount, useBalance } from 'wagmi'
import { Hand } from '../../components/Card'
import { createDeck } from '../../utils/deck'
import { evaluatePokerHand, determineWinner } from '../../utils/poker'

const BETTING_ROUNDS = {
  PRE_FLOP: 'PRE_FLOP',
  FLOP: 'FLOP',
  TURN: 'TURN',
  RIVER: 'RIVER',
  SHOWDOWN: 'SHOWDOWN'
}

export const TexasHoldem = () => {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const toast = useToast()

  const [gameState, setGameState] = useState('waiting')
  const [bettingRound, setBettingRound] = useState(BETTING_ROUNDS.PRE_FLOP)
  const [pot, setPot] = useState(0)
  const [bet, setBet] = useState(0)
  const [deck, setDeck] = useState([])
  const [playerHand, setPlayerHand] = useState([])
  const [computerHand, setComputerHand] = useState([])
  const [communityCards, setCommunityCards] = useState([])
  const [result, setResult] = useState('')

  useEffect(() => {
    if (gameState === 'playing' && playerHand.length === 0) {
      startNewRound()
    }
  }, [gameState])

  const startNewRound = () => {
    const newDeck = createDeck()
    // Deal hole cards
    const player = [newDeck.pop(), newDeck.pop()]
    const computer = [newDeck.pop(), newDeck.pop()]
    setPlayerHand(player)
    setComputerHand(computer)
    setDeck(newDeck)
    setCommunityCards([])
    setBettingRound(BETTING_ROUNDS.PRE_FLOP)
  }

  const handleBet = (amount) => {
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
    setBet(amount)
    setPot(pot + amount)
    setGameState('playing')
  }

  const handleCall = () => {
    setPot(pot + bet)
    advanceRound()
  }

  const handleFold = () => {
    setResult('You folded. Computer wins!')
    setGameState('ended')
  }

  const advanceRound = () => {
    switch (bettingRound) {
      case BETTING_ROUNDS.PRE_FLOP:
        // Deal flop
        const flop = [deck.pop(), deck.pop(), deck.pop()]
        setCommunityCards(flop)
        setBettingRound(BETTING_ROUNDS.FLOP)
        break
      case BETTING_ROUNDS.FLOP:
        // Deal turn
        setCommunityCards([...communityCards, deck.pop()])
        setBettingRound(BETTING_ROUNDS.TURN)
        break
      case BETTING_ROUNDS.TURN:
        // Deal river
        setCommunityCards([...communityCards, deck.pop()])
        setBettingRound(BETTING_ROUNDS.RIVER)
        break
      case BETTING_ROUNDS.RIVER:
        // Showdown
        handleShowdown()
        break
    }
  }

  const handleShowdown = () => {
    const playerFullHand = [...playerHand, ...communityCards]
    const computerFullHand = [...computerHand, ...communityCards]
    
    const hands = [
      { player: 'You', cards: playerFullHand },
      { player: 'Computer', cards: computerFullHand }
    ]
    
    const results = determineWinner(hands)
    const winner = results[0]
    
    setResult(`${winner.player} wins with ${winner.evaluation.name}!`)
    setGameState('ended')
  }

  const handleNewGame = () => {
    setGameState('waiting')
    setBet(0)
    setPot(0)
    setPlayerHand([])
    setComputerHand([])
    setCommunityCards([])
    setResult('')
  }

  return (
    <Box maxW="800px" mx="auto" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Texas Hold'em Poker</Heading>
        
        <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap={6}>
          {/* Game Area */}
          <Box 
            p={6} 
            bg="gray.700" 
            borderRadius="lg"
            minH="400px"
          >
            {gameState === 'waiting' ? (
              <VStack spacing={4}>
                <Text fontSize="xl" color="white">Place your bet to start</Text>
                <HStack spacing={4}>
                  <Button colorScheme="green" onClick={() => handleBet(10)}>Bet 10</Button>
                  <Button colorScheme="green" onClick={() => handleBet(50)}>Bet 50</Button>
                  <Button colorScheme="green" onClick={() => handleBet(100)}>Bet 100</Button>
                </HStack>
              </VStack>
            ) : (
              <VStack spacing={6} align="stretch">
                {/* Computer's Hand */}
                <Box>
                  <Text color="white" mb={2}>Computer's Hand</Text>
                  <Hand 
                    cards={computerHand} 
                    hideFirst={gameState !== 'ended'}
                  />
                </Box>

                {/* Community Cards */}
                <Box>
                  <Text color="white" mb={2}>Community Cards</Text>
                  <Hand cards={communityCards} />
                </Box>

                {/* Player's Hand */}
                <Box>
                  <Text color="white" mb={2}>Your Hand</Text>
                  <Hand cards={playerHand} />
                  {gameState === 'ended' && (
                    <Text color="white" mt={2}>
                      Hand: {evaluatePokerHand([...playerHand, ...communityCards]).name}
                    </Text>
                  )}
                </Box>

                {gameState === 'playing' && (
                  <HStack spacing={4}>
                    <Button colorScheme="green" onClick={handleCall}>
                      Call
                    </Button>
                    <Button colorScheme="red" onClick={handleFold}>
                      Fold
                    </Button>
                  </HStack>
                )}

                {gameState === 'ended' && (
                  <VStack spacing={4}>
                    <Text color="white" fontSize="xl">{result}</Text>
                    <Button colorScheme="blue" onClick={handleNewGame}>
                      New Game
                    </Button>
                  </VStack>
                )}
              </VStack>
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
            <Text color="white">Connected: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No'}</Text>
            <Text color="white">Balance: {balance ? balance.formatted : '0'} ETH</Text>
            <Text color="white">Current Pot: {pot}</Text>
            <Text color="white">Current Bet: {bet}</Text>
            <Text color="white">Round: {bettingRound.replace('_', ' ')}</Text>
          </VStack>
        </Grid>
      </VStack>
    </Box>
  )
}