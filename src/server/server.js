const express = require('express')
const db = require('./db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

// Test route
app.get("/", (req,res)=>{
    res.send("Hello World")
}
)

// Route to get users
app.get("/api/get/users", (req,res)=>{
db.query("SELECT * FROM users", (err,result)=>{
    if(err) {
    res.send(err)    
    console.log(err)
    } 
res.send(result)
});   });

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})