import { getClient, getRepository } from 'jok-mango'
import { Db } from 'mongodb'
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
  constructor(private db: Db) {}

  users = getRepository(this.db, 'users')
  transactions = getRepository(this.db, 'transactions')
}
