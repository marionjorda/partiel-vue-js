<template>
  <button class="button is-large is-ghost" @click="gotoCart">
    <span class="icon is-large">
      <i class="mdi mdi-cart"></i>
    </span>
    <span title="Badge top right" class="badge is-warning">{{
      cartCount
    }}</span>
  </button>
</template>
<script>
export default {
  name: "CartWidget",
  computed: {
    cartCount: function () {
      return this.$store.getters.cartCount;
    },
  },
  methods: {
    gotoCart: function () {
      this.$router.push({ name: "cart" });
    },
  },
};
</script>