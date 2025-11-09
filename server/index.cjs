const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require('fs')

const app = express()
app.use(cors())
app.use(express.json())

// simple in-file persistence for leaderboard
const LB_FILE = path.join(__dirname, 'leaderboard.json')

function readLeaderboard() {
  try {
    const raw = fs.readFileSync(LB_FILE, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

function writeLeaderboard(list) {
  fs.writeFileSync(LB_FILE, JSON.stringify(list, null, 2))
}

let balance = 1000

app.get('/api/balance', (req, res) => {
  res.json({ balance })
})

app.post('/api/update', (req, res) => {
  const { delta } = req.body
  if (typeof delta !== 'number') return res.status(400).json({ error: 'delta must be number' })
  balance += delta
  res.json({ balance })
})

// Leaderboard endpoints
app.get('/api/leaderboard', (req, res) => {
  const list = readLeaderboard()
  // return top 50 sorted descending
  list.sort((a, b) => b.score - a.score)
  res.json(list.slice(0, 50))
})

app.post('/api/leaderboard', (req, res) => {
  const { address, score, name } = req.body
  if (typeof address !== 'string' || typeof score !== 'number') {
    return res.status(400).json({ error: 'address (string) and score (number) required' })
  }
  const list = readLeaderboard()
  const entry = { address, score, name: name || null, ts: Date.now() }
  list.push(entry)
  // keep only top 200 entries locally
  list.sort((a, b) => b.score - a.score)
  const trimmed = list.slice(0, 200)
  writeLeaderboard(trimmed)
  res.json({ ok: true })
})

// Serve static build if present
const dist = path.join(__dirname, '..', 'dist')
app.use(express.static(dist))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
