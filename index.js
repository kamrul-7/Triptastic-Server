const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    }
    finally {

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('Triptastic portal running');

})
app.listen(port, () => console.log(`Triptastic running on ${port}`));