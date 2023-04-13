const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'db_toko_electronik';

async function mongoConnect() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const usersCollection = db.collection('users');
        
        const users = await usersCollection.find().toArray()
      
        return 'done.';
        
    } catch (error) {
        await client.close()
        throw error    }

}