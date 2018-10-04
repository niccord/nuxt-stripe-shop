const { Router } = require('express')
const { Client } = require('pg')

const connectionString = 'postgres://fujddvbe:fGtZuEf_VTr2u0r7RR_McUZZoDdirz4X@horton.elephantsql.com:5432/fujddvbe'

const client = new Client({ connectionString })
client.connect()

const router = Router()
router.post('/saveOrder', function (req, res, next) {
  if (req && req.body && req.body.params && req.body.params.order) {
    const { order } = req.body.params
    const brand = order.card ? order.card.brand : order.brand
    const country = order.card ? order.card.country : order.country
    const cvcCheck = order.card ? order.card.cvc_check : order.cvc_card
    const funding = order.card ? order.card.funding : order.funding

    let query = `INSERT INTO orders (id, price`
    let values = `) VALUES ('${order.id}', ${order.price}`
    if (order.email) {
      query += ', email'
      values += `,'${order.email}'`
    }
    if (order.client_ip) {
      query += ', client_ip'
      values += `, '${order.client_ip}'`
    }
    if (brand) {
      query += ', card_brand'
      values += `, '${brand}'`
    }
    if (country) {
      query += ', card_country'
      values += `, '${country}'`
    }
    if (cvcCheck) {
      query += ', card_cvc_check'
      values += `, '${cvcCheck}'`
    }
    if (funding) {
      query += ', card_funding'
      values += `, '${funding}'`
    }

    client.query(query + values + ')')
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
