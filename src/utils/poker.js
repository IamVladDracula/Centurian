// Helper functions for poker hand evaluation
const getCardValue = (card) => {
  const values = {
    'A': 14, 'K': 13, 'Q': 12, 'J': 11,
    '10': 10, '9': 9, '8': 8, '7': 7,
    '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
  }
  return values[card.value]
}

const countCards = (cards) => {
  const counts = {}
  cards.forEach(card => {
    counts[card.value] = (counts[card.value] || 0) + 1
  })
  return counts
}

const isStraight = (values) => {
  const sortedValues = [...new Set(values)].sort((a, b) => a - b)
  // Check for Ace-low straight (A,2,3,4,5)
  if (sortedValues.toString() === [14,2,3,4,5].toString()) return true
  
  return sortedValues.every((val, i) => {
    if (i === 0) return true
    return val === sortedValues[i-1] + 1
  })
}

const isFlush = (cards) => {
  const suit = cards[0].suit
  return cards.every(card => card.suit === suit)
}

export const evaluatePokerHand = (cards) => {
  const values = cards.map(getCardValue)
  const counts = countCards(cards)
  const pairs = Object.values(counts).filter(count => count === 2).length
  const hasThreeOfKind = Object.values(counts).includes(3)
  const hasFourOfKind = Object.values(counts).includes(4)
  const straight = isStraight(values)
  const flush = isFlush(cards)

  // Royal Flush
  if (straight && flush && values.includes(14) && values.includes(13)) {
    return { rank: 10, name: 'Royal Flush' }
  }
  
  // Straight Flush
  if (straight && flush) {
    return { rank: 9, name: 'Straight Flush' }
  }
  
  // Four of a Kind
  if (hasFourOfKind) {
    return { rank: 8, name: 'Four of a Kind' }
  }
  
  // Full House
  if (hasThreeOfKind && pairs === 1) {
    return { rank: 7, name: 'Full House' }
  }
  
  // Flush
  if (flush) {
    return { rank: 6, name: 'Flush' }
  }
  
  // Straight
  if (straight) {
    return { rank: 5, name: 'Straight' }
  }
  
  // Three of a Kind
  if (hasThreeOfKind) {
    return { rank: 4, name: 'Three of a Kind' }
  }
  
  // Two Pair
  if (pairs === 2) {
    return { rank: 3, name: 'Two Pair' }
  }
  
  // One Pair
  if (pairs === 1) {
    return { rank: 2, name: 'One Pair' }
  }
  
  // High Card
  return { rank: 1, name: 'High Card' }
}

export const determineWinner = (hands) => {
  return hands.map(hand => ({
    ...hand,
    evaluation: evaluatePokerHand(hand.cards)
  }))
  .sort((a, b) => {
    if (b.evaluation.rank !== a.evaluation.rank) {
      return b.evaluation.rank - a.evaluation.rank
    }
    // If same hand rank, compare high cards
    const aValues = a.cards.map(getCardValue).sort((x, y) => y - x)
    const bValues = b.cards.map(getCardValue).sort((x, y) => y - x)
    for (let i = 0; i < aValues.length; i++) {
      if (bValues[i] !== aValues[i]) {
        return bValues[i] - aValues[i]
      }
    }
    return 0
  })
}