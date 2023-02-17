<template>
  <div class="item-container">
    <figure class="image is-64x64">
      <img :src="item?.productThumbnail" />
    </figure>
    <div class="details-container">
      <div><label>Référence : </label><span>{{ item?.productId }}</span></div>
      <div><label>Nom : </label><span>{{ item?.productTitle }}</span></div>
    </div>
    <div class="price-container">
        <product-price-block :product="item?.productId"></product-price-block>
    </div>
  </div>
</template>
<script>
import ProductPriceBlock from "../components/ProductPriceBlock.vue";
export default {
  name: "CartItem",
  components: {
    ProductPriceBlock
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style scoped>
.item-container {
  display: flex;
  gap: 10px;
  border: 1pt solid black;
}
.details-container {
  display: flex;
  flex-direction: column;
}
</style>