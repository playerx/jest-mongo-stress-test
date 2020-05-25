import { DbContext, getDbContext } from '../db.context'

for (let i = 0; i < 1000; i++) {
  describe('simpleTest', () => {
    let db: DbContext

    beforeAll(() =>
      getDbContext(process.env.MONGO_URL!, 'main').then(
        x => (db = x),
      ),
    )

    it('should save user in db', async () => {
      const user = await db.users.query({ name: 'Ezeki' })
      if (!user) {
        await db.users.create({ name: 'Ezeki' })
      }
    })
  })
}
