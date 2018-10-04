<template>
  <div class="container">
    <div class="title">
      <h1>Buy things...please?</h1>
    </div>
    <div class="above-payment">
      <span></span>
      <span>
        <button @click="generateRandomPrice">Generate Random Price</button>
      </span>
      <span></span>
    </div>
    <div class="payment">
      <span></span>
      <button @click="stripeCheckout">Pay via Stripe</button>
      <!-- <button @click="paypalCheckout">Pay via Paypal</button> -->
      <span><h3>Give me {{formattedAmount}}</h3></span>
      <no-ssr>
        <paypal-checkout
          env="sandbox"
          :amount="''+(amount/100)"
          currency="EUR"
          locale="it_IT"
          :button-style="paypalButton"
          :client="paypal"
          :experience="experienceOptions"
          @payment-authorized="onPA"
          @payment-completed="onPC"
          @payment-cancelled="onPCanc"
        >
        </paypal-checkout>
      </no-ssr>
      <span></span>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      paypal: {
        sandbox: 'AVXaEWIzZN6zS-e3att9dc2fqNPNYmWJwuHPElhVxRexWChnJoZLejf3m8gC-uTOcW7HAjouoVfGNbnu',
        production: 'demo_production_client_id'
      },
      paypalButton: {
        label: 'checkout',
        size: 'responsive',
        shape: 'rect',
        color: 'silver'
      },
      amount: 11057,
      experienceOptions: {
        input_fields: {
          no_shipping: 1
        }
      }
    }
  },
  computed: {
    formattedAmount () {
      return this.amount / 100 + ' €'
    }
  },
  created () {
    this.generateRandomPrice()
  },
  methods: {
    generateRandomPrice () {
      this.amount = Math.ceil(Math.random() * 11057 * 2)
    },
    saveOrder (token) {
      const order = Object.assign({}, token)
      order.price = this.amount / 100
      axios.post(
        '/api/saveOrder',
        { params: { order: order } },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          console.log('Ahoy!')
        })
        .catch(() => {
          console.log('Arrrrrrggg!')
        })
    },
    stripeCheckout () {
      // this.$checkout.close()
      // is also available.
      this.$checkout.open({
        image: 'https://i.imgur.com/1PHlmFF.jpg',
        locale: 'it',
        currency: 'EUR',
        name: 'Buy stuff!',
        description: 'Purchase all in your basket',
        amount: this.amount,
        panelLabel: 'Play Nic for {{amount}}',
        token: (token) => {
          // handle the token
          console.log(token)
          this.saveOrder(token)
        }
      })
    },
    paypalCheckout (a, b, c, d) {
      // todo: insert code
      console.log('checkout ok')
      console.log(a, b, c, d)
    },
    onPA (authorization) {
      console.log('----- onPA ------')
      console.log(authorization)
    },
    onPC (payment) {
      // id, email, price, client_ip, card_brand, card_country, card_cvc_check, card_funding
      console.log('----- onPC ------')
      const token = {}
      token.id = payment.id
      token.email = payment.payer.payer_info.email
      token.brand = 'PAYPAL'
      console.log(token)
      this.saveOrder(token)
    },
    onPCanc (paymentCancel) {
      console.log('----- onPCanc ------')
      console.log(paymentCancel)
    }
  }
}
</script>

<style>
.payment {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 2fr 1fr;
  grid-gap: 25px;
}
button {
  margin: 10px;
}
.above-payment {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  grid-gap: 30px;
  height: 65px;
}
</style>
