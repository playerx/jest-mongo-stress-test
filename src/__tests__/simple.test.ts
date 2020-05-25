import { DbContext, getDbContext } from '../db.context'

let db: DbContext

beforeAll(() =>
  getDbContext(process.env.MONGO_URL!, 'main').then(x => (db = x)),
)

describe('simpleTest', () => {
  it('should save user in db', async () => {
    let user = await db.users.query({ name: 'Ezeki' }).then(x => x[0])
    if (!user) {
      user = await db.users.create({ name: 'Ezeki' })
    }

    expect(user).toBeTruthy()
  })
})

describe('simpleTest', () => {
  it('should save user in db', async () => {
    let user = await db.users.query({ name: 'Ezeki' }).then(x => x[0])
    if (!user) {
      user = await db.users.create({ name: 'Ezeki' })
    }

    expect(user).toBeTruthy()
  })
})
