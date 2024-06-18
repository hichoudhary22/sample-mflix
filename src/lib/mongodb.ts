import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

declare global {
  var _mongoConnectionPromise: Promise<MongoClient>;
}

class SingletonInstance {
  private static _instance: SingletonInstance;
  private client: MongoClient;
  private connectionPromise: Promise<MongoClient>;

  private constructor() {
    this.client = new MongoClient(uri, { maxPoolSize: 10 });
    this.connectionPromise = this.client.connect();
    if (process.env.NODE_ENV === "development") {
      global._mongoConnectionPromise = this.connectionPromise;
    }
  }
  public static get connectionPromise() {
    if (!this._instance) {
      this._instance = new SingletonInstance();
    }
    return this._instance.connectionPromise;
  }
}

const connectionPromise = SingletonInstance.connectionPromise;

export default connectionPromise;
