import express from 'express'

const app = express()


app.listen(9000, (req, res)=>{
    console.log("App is on!");
})