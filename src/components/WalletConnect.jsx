import React, { useState } from 'react'
import { ethers } from 'ethers'

export default function WalletConnect() {
  const [addr, setAddr] = useState(null)

  async function connect() {
    if (!window.ethereum) return alert('No EIP-1193 wallet detected')
    try {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAddr(account)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="wallet-connect">
      <p><strong>Base Wallet</strong> (demo): Connect a wallet to show address. This is for demonstration only.</p>
      {addr ? (
        <div>Connected: {addr}</div>
      ) : (
        <button onClick={connect}>Connect Wallet (Base / MetaMask)</button>
      )}
    </div>
  )
}
