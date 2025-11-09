// Simple serverless leaderboard for Vercel
// NOTE: Serverless functions are ephemeral and the in-memory storage below
// will not persist between cold starts or across instances. For production
// use a hosted database (Supabase, MongoDB Atlas, Firebase, etc.) and store
// credentials in Vercel Environment Variables.

let leaderboard = []

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      return response.status(200).json(leaderboard)
    }

    if (request.method === 'POST') {
      const body = await new Promise((resolve, reject) => {
        let data = ''
        request.on('data', chunk => (data += chunk))
        request.on('end', () => resolve(data ? JSON.parse(data) : {}))
        request.on('error', reject)
      })

      const { address, score } = body
      if (!address || typeof score !== 'number') {
        return response.status(400).json({ error: 'Invalid data' })
      }

      const idx = leaderboard.findIndex(e => e.address === address)
      if (idx >= 0) {
        if (score > leaderboard[idx].score) leaderboard[idx].score = score
      } else {
        leaderboard.push({ address, score })
      }

      leaderboard.sort((a, b) => b.score - a.score)
      leaderboard = leaderboard.slice(0, 100)

      return response.status(200).json(leaderboard)
    }

    return response.status(405).setHeader('Allow', 'GET,POST').end()
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: 'Server error' })
  }
}
