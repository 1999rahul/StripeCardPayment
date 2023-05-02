const keys=require('./keys')
const stripe = require('stripe')(keys.SecretKey)
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.static('./public'))


app.get('/',(req,res)=>{
    res.render("index.html")
})



app.post('/create-payment-intent',async (req,res)=>{
    const paymentIntent=await stripe.paymentIntents.create({
        amount:1999,
        currency:'usd'
    })

    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 2000,
    //     currency: 'usd',
    //     automatic_payment_methods: {enabled: true},
    //   });
    res.json({clientSecret:paymentIntent.client_secret})

})

app.listen(3000, ()=>{
    console.log("Listning on 3000")
})