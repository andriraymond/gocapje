import { MongoClient } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient = null;
let database = null;

if (!process.env.NEXT_ATLAS_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

export async function connectToDatabase() {
    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }
        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(uri, options)).connect();
                global._mongoClient = mongoClient;
                console.log("log 1 sukses")
            } else {
                mongoClient = global._mongoClient;
                console.log("log 2 sukses")
            }
        } else {
            mongoClient = await (new MongoClient(uri, options)).connect();
            console.log("log 3 sukses")
        }
        database = await mongoClient.db(process.env.NEXT_ATLAS_DATABASE);
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
    }
}