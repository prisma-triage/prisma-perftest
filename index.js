const express = require('express')
const app = express()
const port = 3000

// const path = require('path')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  forceTransactions: true,
  // __internal: {
  //   engine: {
  //     cwd: process.cwd(),
  //     binaryPath: path.join(process.cwd(), './binaries/julius/query-engine'),
  //   },
  // },
})

app.get('/api/test', async (req, res) => {
  const products = await prisma.product.findMany({ first: 4 })
  res.send(JSON.stringify(products))
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
)
