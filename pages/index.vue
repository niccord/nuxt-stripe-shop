<template>
  <div>
    <button @click="checkout">Buy things</button>
  </div>
</template>
<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      amount: 11057
    }
  },
  methods: {
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
    checkout () {
      // this.$checkout.close()
      // is also available.
      this.$checkout.open({
        image: 'https://i.imgur.com/1PHlmFF.jpg',
        locale: 'it',
        currency: 'EUR',
        name: 'Buy stuff!',
        description: 'Purchase all in your basket',
        amount: this.amount,
        panelLabel: 'Play Roy for {{amount}}',
        token: (token) => {
          // handle the token
          console.log(token)
          this.saveOrder(token)
        }
      })
    }
  }
}
</script>