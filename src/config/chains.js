export const baseMainnet = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://mainnet.base.org'] },
    public: { http: ['https://mainnet.base.org'] },
  },
  blockExplorers: {
    etherscan: { name: 'BaseScan', url: 'https://basescan.org' },
    default: { name: 'BaseScan', url: 'https://basescan.org' },
  },
}

export const baseGoerli = {
  id: 84531,
  name: 'Base Goerli',
  network: 'base-goerli',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://goerli.base.org'] },
    public: { http: ['https://goerli.base.org'] },
  },
  blockExplorers: {
    etherscan: { name: 'BaseScan', url: 'https://goerli.basescan.org' },
    default: { name: 'BaseScan', url: 'https://goerli.basescan.org' },
  },
  testnet: true,
}