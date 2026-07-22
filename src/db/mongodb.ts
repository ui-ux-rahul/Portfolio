import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (db) return { client, db };
  const uri = process.env.MONGODB_URI;
  if (!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))) {
    console.error("MongoDB URI missing or invalid format. Please set MONGODB_URI in environment variables.");
    return { client: null, db: null };
  }

  try {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    await client.connect();
    db = client.db();
    console.log("Successfully connected to MongoDB Atlas!");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas (falling back to cached/JSON data):", error);
    return { client: null, db: null };
  }
}

export async function getMongoData(collectionName: string, defaultValue: any) {
  try {
    const { db } = await connectToDatabase();
    if (!db) return null;

    const collection = db.collection(collectionName);
    const doc = await collection.findOne({ _id: "main_data" as any });
    if (doc) {
      return doc.data;
    } else {
      // Seed with default value
      console.log(`Seeding collection '${collectionName}' in MongoDB with default values.`);
      await collection.updateOne(
        { _id: "main_data" as any },
        { $set: { data: defaultValue } },
        { upsert: true }
      );
      return defaultValue;
    }
  } catch (error) {
    console.error(`Error reading from MongoDB collection '${collectionName}':`, error);
    return null;
  }
}

export async function saveMongoData(collectionName: string, data: any) {
  const { db } = await connectToDatabase();
  if (!db) return false;

  try {
    const collection = db.collection(collectionName);
    await collection.updateOne(
      { _id: "main_data" as any },
      { $set: { data } },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.error(`Error writing to MongoDB collection '${collectionName}':`, error);
    return false;
  }
}
