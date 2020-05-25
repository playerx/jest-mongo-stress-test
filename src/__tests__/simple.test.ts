import { DbContext, getDbContext } from '../db.context'

let db: DbContext

beforeAll(() =>
  getDbContext(process.env.MONGO_URL!, 'main').then(x => (db = x)),
)

describe('simpleTest', () => {
  it('should save user in db', async () => {
    const user = await db.users.query({ name: 'Ezeki' })
    if (!user) {
      await db.users.create({ name: 'Ezeki' })
    }
  })
})

describe('simpleTest', () => {
  it('should save user in db', async () => {
    const user = await db.users.query({ name: 'Ezeki' })
    if (!user) {
      await db.users.create({ name: 'Ezeki' })
    }
  })
})
