<template>
  <div class="block-container">
    <label>Prix unitaire</label><span>{{ cartItem?.productPrice }}</span>
    <quantity-selector
      :product="product"
      class="quantity-container"
    ></quantity-selector>
    <label>Sous-total</label><span>{{ subtotal }}</span>
  </div>
</template>
<script>
import QuantitySelector from "../components/QuantitySelector.vue";

export default {
  name: "ProductPriceBlock",
  components: { QuantitySelector },
  props: {
    product: {
      type: [Number, Object],
      default: 0,
    }
  },
  computed: {
    productId: function () {
      return (typeof this.product === 'object') ? this.product?.id : this.product;
    },
    cartItem: function () {
      return this.$store.getters.getCartItem(this.productId);
    },
    quantity: function () {
      return this.cartItem?.productQuantity || 0;
    },
    subtotal: function () {
      return this.cartItem?.productSubTotal || 0;
    },
  },
};
</script>
<style scoped>
.block-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.quantity-container {
  grid-column: span 2;
}
</style>