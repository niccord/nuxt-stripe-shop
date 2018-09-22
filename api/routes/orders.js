const { Router } = require('express')
const { Client } = require('pg')

const connectionString = 'postgres://fujddvbe:fGtZuEf_VTr2u0r7RR_McUZZoDdirz4X@horton.elephantsql.com:5432/fujddvbe'

const client = new Client({ connectionString })
client.connect()

const router = Router()
router.post('/saveOrder', function (req, res, next) {
  if (req && req.body && req.body.params && req.body.params.order) {
    const { order } = req.body.params
    client.query(`INSERT INTO orders (id, email, price, client_ip, card_brand, card_country, card_cvc_check, card_funding) VALUES ('${order.id}', '${order.email}', ${order.price}, '${order.client_ip}', '${order.card.brand}', '${order.card.country}', '${order.card.cvc_check}', '${order.card.funding}')`)
      .then(() => {
        res.status(200).send('saved')
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send('error during save')
      })
  } else {
    res.status(400).send('Wrong or missing parameter')
  }
})

module.exports = router
