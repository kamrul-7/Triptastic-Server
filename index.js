const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zwakwnm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    client.close();
});

async function run() {
    try {
        const PlaceCollection = client.db('Triptastic').collection('Place');
        const commentCollection = client.db('Triptastic').collection('comment');

        app.get('/Place', async (req, res) => {
            const query = {};
            const options = await PlaceCollection.find(query).toArray();
            res.send(options);
        });

        app.get('/Place/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const service = await PlaceCollection.findOne(query);
            res.send(service);
        });

        app.post("/place", async (req, res) => {
            const filter = req.body;
            const result = await PlaceCollection.insertOne(filter);
            res.send(result);
        });


        app.post('/comment', async (req, res) => {
            const comment = req.body;
            const query = {
                userName: comment.name, comment: comment.comment, email: comment.email
            };
            const result = await commentCollection.insertOne(comment);
            res.send(result);
        })


        app.get('/comment', async (req, res) => {
            const query = {};
            const options = await commentCollection.find(query).toArray();
            res.send(options);
        });

        app.get('/comment', async (req, res) => {
            const email = req.query.email;
            const qury = { email: email };
            const comment = await commentCollection.find(query).toArray();
            res.send(comment);
        });

    }
    finally {

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('Triptastic portal running');

})
app.listen(port, () => console.log(`Triptastic running on ${port}`));