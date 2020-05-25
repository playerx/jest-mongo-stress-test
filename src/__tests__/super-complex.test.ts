import { DbContext, getDbContext } from '../db.context'
import { delay } from '../delay'

let db: DbContext

beforeAll(() =>
  getDbContext(process.env.MONGO_URL!, 'main').then(x => (db = x)),
)

for (let i = 0; i < 1000; i++) {
  describe('administration', () => {
    it('should check users', async () => {
      await db.users.createMany(
        new Array(100)
          .fill(0)
          .map((_, i) => ({ name: 'user' + (i + 1) })),
      )
    })
  })

  describe('transfers' + i, () => {
    it('should create transaction', async () => {
      const tr = await db.transactions.create({
        name: 'Transfer',
        from: 'Acc1',
        to: 'Acc2',
      })

      await delay(3)

      await db.transactions.update(
        { id: tr.id },
        { description: 'should be refunded' },
      )

      await delay(5)

      await db.transactions.update(
        { id: tr.id },
        { description: 'should be refunded. ASAP!' },
      )

      await delay(1)

      await db.transactions.delete({ id: tr.id })
    })
  })
}
