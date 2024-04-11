const { select } = require('./libs/orm/queries/select');

const express = require('express'), 
app = express(); 
  
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
  
app.get('/',  
   async (req, res) => {
      try {
         return res.send(await select("users", ["online", "email"], {online: true}));
      } catch (error) {
         return res.status(500).send({status: 500, error: error.message});
      }
   }) 
  
app.listen(5000,  
   () => console.log(`⚡️[bootup]: Server is running at port: 5000`));