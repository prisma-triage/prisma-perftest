//@ts-check
const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const { PrismaClient } = require('@prisma/client')

app.get('/api/test', async (req, res) => {
  const prisma = new PrismaClient({
    forceTransactions: true,

    /*
  __internal: {
    engine: {
      cwd: process.cwd(),
      binaryPath: path.join(process.cwd(), './binaries/julius/query-engine'),
    },
  },
*/
  })

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const queryPath = getRandomInt(0, 3)

  try {
    let products = ['default']
    if (queryPath === 0) {
      //@ts-ignore
      products = await prisma.product.findMany({
        first: 4,
        orderBy: {
          name: 'asc',
        },
      })
    }
    if (queryPath === 1) {
      //@ts-ignore
      products = await prisma.product.findMany({ first: 4, skip: 2 })
    }
    if (queryPath === 2) {
      //@ts-ignore
      products = await prisma.user.findMany({ last: 4 })
    }
    if (queryPath === 3) {
      //@ts-ignore
      products = await prisma.user.findMany({
        first: 4,
        orderBy: {
          name: 'asc',
        },
      })
    }

    res.send(JSON.stringify(products))
  } catch (e) {
    console.error(e)
    res.send(500)
  } finally {
    await prisma.disconnect()
  }
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
)
