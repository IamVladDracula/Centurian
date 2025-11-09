import React from 'react'

export default function Lobby({ onStart, balance }) {
  return (
    <div className="lobby">
      <h2>Lobby</h2>
      <p>Welcome to Centurian Casino. Try your luck with our demo games (virtual coins).</p>
      <div className="games">
        <div className="game-card">
          <h3>Slot Machine</h3>
          <p>Simple 3-reel slot. Cost per spin is configurable.</p>
          <button onClick={onStart}>Play Slot</button>
        </div>
      </div>
      <p>Your current balance: {balance} coins</p>
    </div>
  )
}
