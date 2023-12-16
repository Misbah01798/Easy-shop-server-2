
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5002;



const uri = `mongodb+srv://umisbah900:JX3qSCbxJUm2Hc0j@cluster0.o7rdiup.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const addMobile =client.db("userDB").collection("mobile");
    const userCollection =client.db("userDB").collection("users");
    const addCart =client.db("userDB").collection("cart");
    app.post("/users", async (req, res) =>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        console.log(result);
        res.send(result);
    });
    
    app.post("/cart", async (req, res) =>{
        const user = req.body;
        const result = await addCart.insertOne(user);
        console.log(result);
        res.send(result);
    });

  
    app.get('/cart', async(req, res)=>{
        const cursor =addCart.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    const addProduct =client.db("userDB").collection("addProduct");
    app.get('/addProduct', async(req, res)=>{
        const cursor =addProduct.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.post("/addProduct", async (req, res) =>{
        const product = req.body;
        const result = await addProduct.insertOne(product);
        console.log(result);
        res.send(result);
    })
    
    
    app.get('/mobile', async(req, res)=>{
        const cursor =addMobile.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/mobile/:id', async(req, res) =>{
      const id = req.params.id;
      const query ={_id: new ObjectId(id)}
      const result = await addMobile.findOne(query);
      res.send(result);
    })
    app.post("/mobile", async (req, res) =>{
        const product = req.body;
        const result = await addMobile.insertOne(product);
        console.log(result);
        res.send(result);
    })
    app.put("/mobile/:id", async(req, res)=>{
      const id =req.params.id;
      const filter ={_id: new ObjectId(id)}
      const options ={upsert: true};
      const updateData =req.body;
      const update ={
        $set:{
          image: updateData.image, 
          name: updateData.name, bname: updateData.bname, type: updateData.type, price: updateData.price, rating: updateData.rating
        }
      }
      const result =await addMobile.updateOne(filter, update, options);
      res.send(result)
    })
    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Crud is running...");
  });
  
  


  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });
  
  