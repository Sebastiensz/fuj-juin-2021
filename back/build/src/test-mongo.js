"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));
(async () => {
    try {
        // Connection URI
        const uri = 'mongodb://localhost:27017/';
        // Create a new MongoClient
        const client = new mongodb_1.MongoClient(uri, { useUnifiedTopology: true });
        try {
            // Connect the client to the server
            await client.connect();
            const db = await client.db('gestion-stock');
            await db.collection('articles').deleteMany({});
            // Establish and verify connection
            //   await client.db("admin").command({ ping: 1 });
            const article = {
                name: 'Tournevis',
                price: 2.99,
                qty: 100,
            };
            const article2 = {
                name: 'Tournevis',
                price: 2.99,
                qty: 100,
            };
            const r = await db.collection('articles').insertOne(article);
            console.log('r: ', r);
            await sleep(1000);
            const r2 = await db.collection('articles').insertOne(article2);
            const articles = await db
                .collection('articles')
                .find({})
                .toArray();
            console.log('articles: ', articles);
            console.log('Connected successfully to server');
            const ids = [];
            //   ids.push(new ObjectID(r.ops[0]._id));
            ids.push(new mongodb_1.ObjectID(r2.ops[0]._id));
            console.log('ids:', ids);
            await db.collection('articles').deleteMany({
                _id: {
                    $in: ids,
                },
            });
            const articles2 = await db
                .collection('articles')
                .find({})
                .toArray();
            console.log('articles2', articles2);
            console.log('Connected successfully to server');
        }
        finally {
            // Ensures that the client will close when you finish/error
            await client.close();
            console.log('closed');
        }
    }
    catch (err) {
        console.log('err:', err);
    }
})();
//# sourceMappingURL=test-mongo.js.map