const { pool } = require('./database');

const express = require('express'), 
app = express(); 
  
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
  
app.get('/',  
   async (req, res) => {
      const data = await pool.query("SELECT * FROM users;");
      res.send(data);
   }) 
  
app.listen(5000,  
   () => console.log(`⚡️[bootup]: Server is running at port: 5000`));

