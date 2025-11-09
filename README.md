# Centurian Casino  Miniapp (Demo)

This is a demo online gaming miniapp named "Centurian Casino" built as a starting point for a Base (Coinbase Base) blockchain-enabled casino-style UI. It uses virtual coins only (no real-money wagering). The project includes a React + Vite frontend and a minimal Express server placeholder for demo API endpoints and a Base wallet connect placeholder.

Important: This is for demo / development use only. No real-money gambling features are implemented. Use virtual currency only and follow local laws and age restrictions.

Quick setup (Windows PowerShell):

```powershell
npm install
npm run dev
```

To run the Express server (API placeholder):

```powershell
node server/index.js
```

Files of interest:
- `src/`  React app
- `src/components/SlotMachine.jsx`  simple slot machine demo
- `src/components/WalletConnect.jsx`  Base wallet connect placeholder (EIP-1193)
- `server/`  minimal Express server with demo endpoints

Next steps:
- Confirm whether you want actual Base (testnet) integration (connect wallet + sign transactions for on-chain tokens). If yes, tell me whether to use testnet or mainnet and what on-chain flows you need.
- Which additional games do you want (roulette, blackjack)?

