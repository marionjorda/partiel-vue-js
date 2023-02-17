<template>
  <span>
    <button :disabled="quantity <= 0" @click="decrementQuantity">
      <span class="icon is-small">
        <i class="mdi mdi-minus"></i>
      </span></button
    ><input type="text" :value="quantity" @change="validateInputQuantity" />
    <button @click="incrementQuantity">
      <span class="icon is-small">
        <i class="mdi mdi-plus"></i>
      </span>
    </button>
  </span>
</template>
<script>
export default {
  name: "QuantitySelector",
  data() {
    return {
      quantity: 0,
    };
  },
  props: {
    product: {
      type: [Number, Object],
      default: 0
    }
  },
  computed: {
    productId: function () {
      return (typeof this.product === 'object') ? this.product?.id : this.product;
    },
    cartItem: function() {
        return this.$store.getters.getCartItem(this.productId);
    },
    quantityInCart: function () {
      return this.cartItem?.productQuantity || 0;
    },
  },
  methods: {
    validateInputQuantity: function(event) {
      const newQuantity = parseInt(event.target.value);
      if (this.confirmNewQuantity(newQuantity))
        this.quantity = newQuantity;
      else {
        event.target.value = this.cartItem?.productQuantity;
        event.preventDefault();
      }
    },
    confirmNewQuantity: function(quantity) {
      if (quantity === 0 && !window.confirm('Voulez-vous supprimer ce produit du panier ?'))
        return false;
      this.quantity = quantity;
      return true;
    },
    updateQuantityInCart: function (newValue) {
      this.$store.dispatch("updateProductOrderedQuantity", {
        product: this.product,
        quantity: newValue,
      });
    },
    incrementQuantity: function () {
      this.confirmNewQuantity(this.quantity + 1);
    },
    decrementQuantity: function () {
      this.confirmNewQuantity(this.quantity - 1);
    },
  },
  watch: {
    quantity: function (newValue, oldValue) {
      console.log(`quantity change old:${oldValue} new:${newValue}`);
      if (oldValue || newValue !== 0)
        this.updateQuantityInCart(newValue);
    },
    quantityInCart: function (newValue) {
      this.quantity = newValue;
    },
  },
  mounted() {
    this.quantity = this.quantityInCart;
  },
};
</script>