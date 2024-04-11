const { pool } = require('./database');
const  cors  = require ('cors')

const express = require('express'), 
app = express(); 

app.use(cors({origin: 'http://localhost:3000', // Autoriser les requêtes provenant de cette origine
methods: ['GET', 'POST'], // Autoriser uniquement les méthodes GET et POST
allowedHeaders: ['Content-Type'],}))// Autoriser uniquement les en-têtes Content-Type))
app.options('/', cors())
const router = require('./api/auth/register');
  
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
  
app.get('/',  
   async (req, res) => {
      const data = await pool.query("SELECT * FROM users;");
      res.send(data);
   }) 

app.use('/', router)

  
app.listen(5000,  
   () => console.log(`⚡️[bootup]: Server is running at port: 5000`));

