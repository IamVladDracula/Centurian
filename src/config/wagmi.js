import { configureChains, createConfig } from 'wagmi'
import { base, baseGoerli } from 'wagmi/chains'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'

// Configure chains & providers
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID' // Replace with your WalletConnect Project ID
const chains = [base, baseGoerli]

export const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

// Set up wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient
})

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiConfig, chains)