<template>
<div class="list-container">
  <h1>{{ title }}</h1>
  <cart-widget></cart-widget>
  Filter : <input type="text" v-model="filter" /><br />
  Price : <input type="text" v-model="maximumPrice" /><br />
  <div class="product-list">
    <product-card
    class="product-card"
    v-for="product in currentPage"
    :product="product"
      :key="product.id"
      @click="gotoProduct(product)"
    ></product-card>
  </div>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous" @click="pageIndex--" v-if="pageIndex > 0">
      Previous
    </a>
    <a class="pagination-next"
      @click="pageIndex++"
      v-if="pageIndex < numberOfPages - 1">
      Next page
    </a>
    <ul class="pagination-list">
      <li v-for="pageNumber in numberOfPages" :key="pageNumber">
        <a
          class="pagination-link"
          :class="{ 'is-current': pageNumber === pageIndex + 1 }"
          :aria-label="`Page ${pageNumber}`"
          aria-current="page"
          @click="pageIndex = pageNumber - 1"
          >{{ pageNumber }}</a
        >
      </li>
    </ul>
  </nav>
</div>

</template>
<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";
import CartWidget from "../components/CartWidget.vue";


const fetchProduts = function () {
    return new Promise((resolve, reject) => {
      axios
      .get("https://dummyjson.com/products")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
    })
};

export default {
  name: "ProductList",
  components: {
    ProductCard,
    CartWidget
  },
  data() {
    return {
      title: "Site de E-Commerce",
      products: [],
      filter: "",
      itemsPerPage: 10,
      pageIndex: 0,
      maximumPrice: "",
      minimumPrice: "",
    };
  },
  methods: {
    gotoProduct(product) {
      this.$router.push({ name: "product", params: { id: product.id } });
    },
  },
  computed: {
    dataUrl: function () {
      return "https://dummyjson.com/products";
    },
    filteredProducts: function () {
      if (this.products !== undefined)
        return this.products.filter(product => product.description.toLowerCase().includes(this.filter.toLowerCase()) && product.title.toLowerCase().includes(this.filter.toLowerCase()) && (this.minimumPrice !== "" ? (product.price >= this.minimumPrice) : true) && (this.maximumPrice !== "" ? (product.price <= this.maximumPrice) : true));
      else return [];
    },
    itemsOffset: function () {
      return this.pageIndex * this.itemsPerPage;
    },
    currentPage: function () {
      if (!!this.filteredProducts && this.filteredProducts.length > 0)
        return this.filteredProducts.slice(
          this.itemsOffset,
          this.itemsOffset + this.itemsPerPage
        );

      return [];
    },
    numberOfPages: function () {
      if (!!this.filteredProducts && this.filteredProducts.length > 0)
        return Math.ceil(this.filteredProducts.length / this.itemsPerPage);

      return 0;
    },
  },

  created() {
        fetchProduts()
        .then(productF => this.products = productF.products)
        .catch(error => console.error(error));
  },


}

  

</script>
<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
}


.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  width: 300px;
}
</style>