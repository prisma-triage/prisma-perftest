# prisma-perftest

1. `yarn`
1. Add env var `DATABASE_URL` in .env
1. `yarn start`
1. `artillery quick http://localhost:3000/api/test -r 20 -d 30
`
