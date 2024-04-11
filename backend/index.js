const { pool } = require('./database');

const express = require('express'), 
app = express(); 
app.use(cors())
  
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
  
app.get('/',  
   async (req, res) => {
      const data = await pool.query("SELECT * FROM users;");
      res.send(data);
   }) 

app.post('/', async (req, res) => {
   console.log(req)
})
  
app.listen(5000,  
   () => console.log(`⚡️[bootup]: Server is running at port: 5000`));

