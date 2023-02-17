<template>
  <div>
    <div class="toolbar">
      <router-link :to="{ path: '/' }">&lt;&nbsp;Retour</router-link>
    </div>
    <div class="items-container">
      <h2 v-if="isNullOrEmptyCart">Votre panier est vide.</h2>
      <cart-item
        v-for="item in cart"
        :item="item"
        :key="item.productId"
      ></cart-item>
    </div>
  </div>
</template>
<script>
import CartItem from "../components/CartItem.vue";
export default {
  name: "Cart",
  components: {
    CartItem,
  },
  computed: {
    cart: function () {
      return this.$store.state.cart;
    },
    isNullOrEmptyCart: function() {
      return this.$store.getters.isNullOrEmptyCart;
    }
  },
};
</script>
<style scoped>
.items-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>