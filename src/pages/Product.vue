<template>
  <div class="product-container">
    <div class="toolbar">
      <router-link :to="{ path: '/' }">&lt;&nbsp;Retour</router-link>
    </div>
    <div class="tile container">
      {{ product.title }}
    </div>
    <div>
      <figure class="image is-4by3">
        <img :src="product.thumbnail" alt="Placeholder image" />
      </figure>
    </div>
    <div class="images-container">
      <figure
        class="image is-128x128"
        v-for="image in product.images"
        :key="image"
      >
        <img :src="image" />
      </figure>
    </div>
    <div class="details-container">
      <div class="props-container">
        <label>Marque : </label><span>{{ product.brand }}</span>
        <label>Description : </label><span>{{ product.description }}</span>
      </div>
    </div>
    <div>
      <product-price-block :product="product"></product-price-block>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ProductPriceBlock from "../components/ProductPriceBlock.vue";

export default {
  name: "Product",
  components: {
    ProductPriceBlock,
  },
  data() {
    return {
      product: {},
    };
  },
  props: {
    productId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    dataUrl: function () {
      return `https://dummyjson.com/products/${this.productId}`;
    },
  },
  methods: {
    fetchProduct: function () {
      axios
        .get(this.dataUrl)
        .then(({ data }) => (this.product = data))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>
<style scoped>
.product-container {
  display: flex;
  flex-direction: column;
}

.images-container {
  display: flex;
  gap: 10px;
  padding: 10px;
}

.details-container {
  display: flex;
}

.props-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>