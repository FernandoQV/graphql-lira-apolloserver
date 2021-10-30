//creamos la clsae de coneccion mongo db
import { MongoClient, Db, MongoClientOptions } from "mongodb";
import config from "../config";
export default class MongoLib {
  private client: MongoClient;
  private dbName: any = config.dbName;
  private mongoUri: any = config.mongoUri;
  private static connection: Db;
  constructor() {
    this.client = new MongoClient(this.mongoUri);
    console.log("constructor");
  }
  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect();
        console.log("[Mongo] Connected succesfully to mongo");
        MongoLib.connection = this.client.db(this.dbName);
      } catch (error) {
        console.log(error);
      }
    }
    return MongoLib.connection;
  }
}