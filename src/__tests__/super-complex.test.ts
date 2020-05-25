import { DbContext, getDbContext } from '../db.context'
import { delay } from '../delay'

for (let i = 0; i < 100; i++) {
  describe('administration', () => {
    let db: DbContext

    beforeAll(() =>
      getDbContext(process.env.MONGO_URL!, 'db1').then(x => (db = x)),
    )

    beforeEach(() =>
      Promise.all([db.users.collection.deleteMany({})]),
    )

    it('should check users', async () => {
      await db.users.createMany(
        new Array(100)
          .fill(0)
          .map((_, i) => ({ name: 'user' + (i + 1) })),
      )

      const count = await db.users.count()
      expect(count).toBe(100)
    })
  })

  describe('transfers' + i, () => {
    let db: DbContext

    beforeAll(() =>
      getDbContext(process.env.MONGO_URL!, 'db2').then(x => (db = x)),
    )

    beforeEach(() =>
      Promise.all([
        db.users.collection.deleteMany({}),
        db.transactions.collection.deleteMany({}),
      ]),
    )

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

      const count = await db.transactions.count()
      expect(count).toBe(0)
    })
  })

  describe('rollbacks', () => {
    let db: DbContext

    beforeAll(() =>
      getDbContext(process.env.MONGO_URL!, 'db2').then(x => (db = x)),
    )

    beforeEach(() =>
      Promise.all([
        db.users.collection.deleteMany({}),
        db.transactions.collection.deleteMany({}),
      ]),
    )

    it('should rollback', async () => {
      const user = await db.users.create({ name: 'u1' })

      const count1 = await db.users.count()
      expect(count1).toBe(1)

      try {
        await db.runTransaction(async dbx => {
          await dbx.users.update({ id: user.id }, { name: 'u223' })
          //   await dbx.transactions.create({ name: 't2' })
          throw new Error('OOPS')
        })
      } catch (err) {
        expect(err.message).toBe('OOPS')
      }

      const countCheck1 = await db.users.count()
      expect(countCheck1).toBe(1)

      const updatedUser = await db.users.get(user.id)
      expect(updatedUser!['name']).toBe('u1')
    })
  })
}
