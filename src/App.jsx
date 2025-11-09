import React, { useEffect, useState } from 'react'
import Lobby from './components/Lobby'
import SlotMachine from './components/SlotMachine'
import WalletConnect from './components/WalletConnect'

export default function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('cc_balance')
    return saved ? Number(saved) : 1000
  })
  const [view, setView] = useState('lobby')

  useEffect(() => {
    localStorage.setItem('cc_balance', String(balance))
  }, [balance])

  return (
    <div className="app">
      <header className="header">
        <h1>Centurian Casino</h1>
        <div className="balance">Balance: {balance} coins</div>
      </header>
      <main>
        <WalletConnect />
        {view === 'lobby' && (
          <Lobby onStart={() => setView('slot')} balance={balance} />
        )}
        {view === 'slot' && (
          <SlotMachine
            balance={balance}
            onBack={() => setView('lobby')}
            updateBalance={(next) => setBalance(next)}
          />
        )}
      </main>
    </div>
  )
}
