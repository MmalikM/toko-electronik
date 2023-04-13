const { MongoClient } = require('mongodb');

const url = process.env.DATABASE_URL_MONGO
// const url = process.env.URL

const client = new MongoClient(url);
let db;

// const dbName = 'db_toko_electronik';
const dbName = 'tokoelektronik';


async function mongoConnect() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        db = client.db(dbName);

        return 'done.';
        
    } catch (error) {
        await client.close()
        throw error    }
}

const getDB = () => db


module.exports = {mongoConnect,getDB}