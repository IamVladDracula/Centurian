import { useState, useEffect } from 'react'
import { Box, Button, Grid, Heading, Text, VStack, HStack, useToast } from '@chakra-ui/react'
import { useAccount, useBalance } from 'wagmi'
import { Hand } from '../../components/Card'
import { createDeck, calculateHandValue } from '../../utils/deck'

export const Blackjack = () => {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const toast = useToast()
  
  const [gameState, setGameState] = useState('waiting') // waiting, playing, ended
  const [bet, setBet] = useState(0)
  const [deck, setDeck] = useState([])
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [result, setResult] = useState('')
  
  useEffect(() => {
    if (gameState === 'playing' && playerHand.length === 0) {
      const newDeck = createDeck()
      setDeck(newDeck)
      // Deal initial cards
      const player = [newDeck.pop(), newDeck.pop()]
      const dealer = [newDeck.pop(), newDeck.pop()]
      setPlayerHand(player)
      setDealerHand(dealer)
      setDeck(newDeck)
      
      // Check for natural blackjack
      if (calculateHandValue(player) === 21) {
        handleDealerTurn(player, dealer, newDeck)
      }
    }
  }, [gameState])

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
    setGameState('playing')
  }

  const handleHit = () => {
    const newCard = deck.pop()
    const newHand = [...playerHand, newCard]
    setPlayerHand(newHand)
    setDeck(deck)

    const value = calculateHandValue(newHand)
    if (value > 21) {
      setResult('Bust! Dealer wins!')
      setGameState('ended')
    }
  }

  const handleStand = () => {
    handleDealerTurn(playerHand, dealerHand, deck)
  }

  const handleDealerTurn = (playerCards, dealerCards, currentDeck) => {
    let newDealerHand = [...dealerCards]
    let newDeck = [...currentDeck]
    
    const playerValue = calculateHandValue(playerCards)
    let dealerValue = calculateHandValue(newDealerHand)
    
    // Dealer must hit on 16 and below
    while (dealerValue < 17) {
      const newCard = newDeck.pop()
      newDealerHand.push(newCard)
      dealerValue = calculateHandValue(newDealerHand)
    }
    
    setDealerHand(newDealerHand)
    setDeck(newDeck)
    
    // Determine winner
    if (dealerValue > 21) {
      setResult('Dealer busts! You win!')
    } else if (dealerValue > playerValue) {
      setResult('Dealer wins!')
    } else if (playerValue > dealerValue) {
      setResult('You win!')
    } else {
      setResult('Push!')
    }
    
    setGameState('ended')
  }

  const handleNewGame = () => {
    setGameState('waiting')
    setBet(0)
    setPlayerHand([])
    setDealerHand([])
    setResult('')
  }

  return (
    <Box maxW="800px" mx="auto" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Blackjack</Heading>
        
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
                <Box>
                  <Text color="white" mb={2}>Dealer's Hand</Text>
                  <Hand cards={dealerHand} hideFirst={gameState === 'playing'} />
                  {gameState !== 'playing' && (
                    <Text color="white" mt={2}>
                      Value: {calculateHandValue(dealerHand)}
                    </Text>
                  )}
                </Box>
                
                <Box>
                  <Text color="white" mb={2}>Your Hand</Text>
                  <Hand cards={playerHand} />
                  <Text color="white" mt={2}>
                    Value: {calculateHandValue(playerHand)}
                  </Text>
                </Box>

                {gameState === 'playing' && (
                  <HStack spacing={4}>
                    <Button colorScheme="green" onClick={handleHit}>Hit</Button>
                    <Button colorScheme="yellow" onClick={handleStand}>Stand</Button>
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
            <Text color="white">Current Bet: {bet}</Text>
          </VStack>
        </Grid>
      </VStack>
    </Box>
  )
}