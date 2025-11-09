import React, { useState } from 'react'

const SYMBOLS = ['', '', '', '', '7']

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
}

export default function SlotMachine({ balance, updateBalance, onBack }) {
  const [reels, setReels] = useState(['-', '-', '-'])
  const [spinning, setSpinning] = useState(false)
  const COST = 10

  function spin() {
    if (spinning) return
    if (balance < COST) return alert('Not enough coins')

    setSpinning(true)
    updateBalance(balance - COST)

    // simulate reel spins
    const newReels = [randomSymbol(), randomSymbol(), randomSymbol()]
    setTimeout(() => {
      setReels(newReels)
      const payout = evaluate(newReels)
      if (payout > 0) updateBalance(balance - COST + payout)
      setSpinning(false)
    }, 800)
  }

  function evaluate(r) {
    // simple rules: three of a kind pays, two of a kind pays small
    if (r[0] === r[1] && r[1] === r[2]) {
      if (r[0] === '7') return 500
      if (r[0] === '') return 200
      return 100
    }
    if (r[0] === r[1] || r[1] === r[2] || r[0] === r[2]) return 20
    return 0
  }

  return (
    <div className="slot">
      <h2>Slot Machine</h2>
      <div className="reels">
        <div className="reel">{reels[0]}</div>
        <div className="reel">{reels[1]}</div>
        <div className="reel">{reels[2]}</div>
      </div>
      <div className="controls">
        <button onClick={spin} disabled={spinning || balance < COST}>
          {spinning ? 'Spinning...' : `Spin (${COST} coins)`}
        </button>
        <button onClick={onBack}>Back to lobby</button>
      </div>
      <p>Rules: 3x same = big payout, 2x same = small payout.</p>
    </div>
  )
}
