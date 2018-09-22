import Vue from 'vue'
import VueStripeCheckout from 'vue-stripe-checkout'

const options = {
  key: 'pk_test_a3l0Iekhl9SNVO9dYYYZu3yt', // STRIPE_TOKEN,
  locale: 'auto',
  currency: 'EUR'
}

Vue.use(VueStripeCheckout, options)
