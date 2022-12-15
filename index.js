const express = require('express');

require("./src/config/database").connect()
const router = require("./src/routes");

const app = express();


const port = 3000;

app.use(express.json());
app.use('/api',router);

app.listen(port,()=>{
  console.log(`[INFO] : Server is running at ${port}`);
})