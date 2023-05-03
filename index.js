const keys=require('./keys')
const stripe = require('stripe')(keys.SecretKey)
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.static('./public'))


app.get('/',(req,res)=>{
    res.render("index.html")
})

app.get('/setup-intents',async (req,res)=>{
    const setupIntent = await stripe.setupIntents.create();
    res.send(setupIntent)
})

app.post('/create_customer',async (req,res)=>{
    const customer = await stripe.customers.create({
        'payment_method':req.body.payment_method
      });
      res.send(JSON.stringify(customer))
})

app.listen(3000, ()=>{
    console.log("Listning on 3000")
}) 