<script setup>
import { defineProps } from 'vue'

defineProps(['cartList', 'removeProduct'])
</script>

<template>
  <tbody>
    <tr v-for="item in cartList" :key="item.id">
      <td>
        <button type="button" class="btn btn-sm" @click="removeProduct(item)">x</button>
      </td>
      <td>{{ item.name }}</td>
      <td>
        <small>{{ item.description }}</small>
      </td>
      <td>
        <select class="form-select" v-model="item.qty">
          <option v-for="num in 10" :key="num" :value="num">{{ num }}</option>
        </select>
      </td>
      <td>{{ item.price }}</td>
      <td>{{ item.price * item.qty }}</td>
    </tr>
  </tbody>
</template>
