import { getClient, getRepository } from 'jok-mango'
import { ClientSession, Db } from 'mongodb'
let client

export async function getDbContext(
  connectionString: string,
  dbName?: string,
) {
  if (!client) {
    client = await getClient(connectionString)
  }

  const db = await client.db(dbName)

  return new DbContext(db)
}

export class DbContext {
  constructor(private db: Db, private session?: ClientSession) {}

  users = getRepository(this.db, 'users', this.getDefaultOptions())
  transactions = getRepository(
    this.db,
    'transactions',
    this.getDefaultOptions(),
  )

  async runTransaction(action: TransactionAction) {
    if (!client) {
      console.log('client not initialized yet')
      return
    }

    const session = client.startSession()
    session.startTransaction()

    try {
      const transactionalDb = new DbContext(this.db, session)

      const result = await action(transactionalDb)

      // finish transaction
      await session.commitTransaction()
      session.endSession()

      return result
    } catch (error) {
      // If an error occurred, abort the whole transaction and
      // undo any changes that might have happened
      await session.abortTransaction()
      session.endSession()

      throw error // Rethrow so calling function sees error
    }
  }

  private getDefaultOptions() {
    return {
      session: this.session,
    }
  }
}

type TransactionAction = (db: DbContext) => Promise<any>
