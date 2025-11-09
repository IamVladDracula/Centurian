Deployment guide
================

This repo contains a Vite React frontend and a simple API (serverless) under `api/`.

Recommended deployment (free/easy):

1) Frontend on Vercel (static) + Serverless API on Vercel

 - Create a GitHub repository and push this project.
 - In Vercel, import the GitHub repo and deploy. Vercel will run `npm run build` and serve the `dist/` output.
 - The included `api/leaderboard.js` provides a demo leaderboard. Note: it uses in-memory storage which is ephemeral on serverless platforms. For production use Supabase, MongoDB Atlas, Firebase, etc.

2) Backend with persistent storage (recommended for leaderboard):

 - Create a Supabase project (https://supabase.com) or MongoDB Atlas cluster.
 - Create a table/collection for leaderboard entries (address, score, created_at).
 - Update `api/leaderboard.js` to use Supabase or MongoDB and set the connection string in Vercel Environment Variables.

3) Quick local preview: start backend and frontend locally

```powershell
cd C:\path\to\Miniapp\server
node index.cjs  # starts backend on PORT 3000

cd C:\path\to\Miniapp
npm install
node node_modules/vite/bin/vite.js --host
```

4) Add environment variables on Vercel

 - For any secrets (WalletConnect project ID, Supabase keys), add them in the Vercel dashboard under Project Settings > Environment Variables.

If you want, I can:
 - Help you push this repo to GitHub.
 - Create the Supabase table and update the API to use it (you'll need to provide API keys or set them in Vercel).
 - Complete deployment steps and verify the live site.
