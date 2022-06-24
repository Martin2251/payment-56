const express = require("express")

const bodyParser = require("body-parser")

const path = require("path")

const app  = express()

const PUBLISHABLE_KET = "pk_test_51KtZHVBfQObqjWgYTORic2mXm1oJWs6wazBcdN7I6XLYSen0tJXF4juWaNFQS98WqlgJnuFlNRFNhaBw8nV2EtQu00WmVLCjHn"

const SECRET_KEY = "sk_test_51KtZHVBfQObqjWgYQf3ptS6JOZ9JXB4CoPGXHutQIeun43SCimopEHC9O92fLDlKCn0d6MLhf4jWtHJSmMaYLnM500J8Ldpzy4"

const stripe = require("stripe")(SECRET_KEY)


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set("view engine", "ejs")

const PORT = process.env.PORT || 3000

app.get("/", (req,res) => {
res.render("Home", {
    key: PUBLISHABLE_KET
})
})

app.post("/payment", (req,res) => {
stripe.customers.create({
email: req.body.stripeEmail,
source: req.body.stripeToken,
name: 'Martin  Lowe',
address:{
    line1: '23 old road London',
    postal_code: '12347',
    city: 'London',
    state: 'London',
    country: 'UK'
}
})
.then((customer) => {
    return stripe.charges.create({
        amount :3000,
        description: "Web Course",
        currency: "USD",
        customer: customer.id
    })
})
.then((charge) => {
    console.log(charge)
    res.send("success")
})
.catch((err) => {
    res.send(err)
})

})

app.listen(PORT, () => {
    console.log(`APP is listening on ${PORT}`)
})