<script setup>
import { defineProps } from 'vue'
defineProps(['productList', 'addProduct'])
</script>

<template>
  <div class="list-group">
    <a
      href="#"
      class="list-group-item list-group-item-action"
      v-for="product in productList"
      :key="product.id"
      @click="addProduct(product)"
      ><div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ product.name }}</h5>
        <small>$ {{ product.price }}</small>
      </div>
      <p class="mb-1">{{ product.description }}</p></a
    >
  </div>
</template>
