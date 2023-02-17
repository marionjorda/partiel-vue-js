<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3 product-thumbnail" @click="$emit('click')">
        <img :src="product.thumbnail" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ product.title }}</p>
          <p class="subtitle is-6">{{ product.brand }}</p>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <quantity-selector :product="product" class="card-footer-item"></quantity-selector>
    </footer>
  </div>
</template>
<script>
import QuantitySelector from "../components/QuantitySelector.vue";

export default {
  name: "ProductCard",
  components: { QuantitySelector },
  emits: ["click"],
  props: {
    product: {
      type: Object,
      default: () => null,
    },
  },
};
</script>
<style scoped>
.product-thumbnail {
  cursor: pointer;
}
</style>