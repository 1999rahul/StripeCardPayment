const keys=require('./keys')
const stripe = require('stripe')(keys.SecretKey)
const express = require('express')
const path=require('path')

const app = express()

app.use(express.json())
app.use(express.static('./public'))
// app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
    res.send("index.html")
})
app.get('/admin',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public')+"/admin.html")
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

app.post('/payment-intents',async (req,res)=>{
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2000,
            currency: 'usd',
            payment_method_types:['card'],
            customer:req.body.customer,
            payment_method:req.body.payment_method,
            off_session:true,
            conform:true
          });
          res.send(paymentIntent)
    }
    catch(e){
        res.send(JSON.stringify(e))
    }
})

app.listen(3000, ()=>{
    console.log("Listning on 3000")
}) 