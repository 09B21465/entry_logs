import mongoose from "mongoose";
import express from "express";
import env from "dotenv";
env.config();
import apiRoute from "./api-routes/index.mjs";
import { MongoClient, ServerApiVersion } from "mongodb";


// const client = new MongoClient(process.env.MONGO_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/",apiRoute);
//error
app.use( (req,res)=> {
  res.status(404).json({ msg: "Page Not Found" });
})

app.listen(port, () => {
  console.log(`Server Start: http://localhost:${port}`);
})


// async function getCollection() {
//   try {
//     await client.connect();
//     const db = client.db("inout_table")//.command({ ping: 1 });
//     return db.collection("entry_logs");
//   } catch {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// getAllEntry();
// async function getAllEntry() {
//     const col = await getCollection();
//     const cursor = col.find({ status: "入室" });
//     const result = await cursor.toArray();
//     console.log(result);

//     await client.close();
// }


// run().catch(console.dir);