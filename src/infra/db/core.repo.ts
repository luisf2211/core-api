// src/infra/db/core.repo.ts
import { MongoClient, Db, Collection } from 'mongodb';

export class MongoRepository {
  private static client: MongoClient;
  protected static db: Db;

  static async connect(): Promise<void> {
    if (!this.client) {
      const uri = process.env.MONGO_URI;
      const dbName = process.env.MONGO_DB;

      this.client = new MongoClient(uri || '');
      await this.client.connect();
      this.db = this.client.db(dbName);

      console.log(`[MongoRepository] Connected to DB: ${dbName}`);
    }
  }

  protected getCollection(collectionName: string): Collection<any> {
    if (!MongoRepository.db) {
      throw new Error('MongoDB not connected. Call connect() first.');
    }

    return MongoRepository.db.collection(collectionName);
  }

  static async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('[MongoRepository] Disconnected');
    }
  }
}
