<script setup>
import { ref } from 'vue'
const data = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: '50',
    qty: '20',
    isEdit: false,
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: '45',
    qty: '18',
    isEdit: false,
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: '55',
    qty: '34',
    isEdit: false,
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: '45',
    qty: '10',
    isEdit: false,
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香純鮮奶',
    price: '50',
    qty: '25',
    isEdit: false,
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的新清結合',
    price: '45',
    qty: '20',
    isEdit: false,
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的茶特風味',
    price: '55',
    qty: '18',
    isEdit: false,
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶的鮮奶的搭配',
    price: '60',
    qty: '20',
    isEdit: false,
  },
]
const drinks = ref(data)
const tempName = ref('')

console.log(tempName, tempName.value)

const addQty = (id) => {
  drinks.value = drinks.value.map((drink) => {
    if (drink.id === id) {
      drink.qty++
    }
    return drink
  })
}

const minusQty = (id) => {
  drinks.value = drinks.value.map((drink) => {
    if (drink.id === id && drink.qty > 0) {
      drink.qty--
    }
    return drink
  })
}

const edit = (drink) => {
  const index = drinks.value.findIndex((i) => i.id === drink.id)
  drinks.value[index].isEdit = true
  tempName.value = drink.name
}

const saveEdit = (drink) => {
  if (tempName.value !== '') {
    drink.name = tempName.value
    drinks.value.forEach((drink) => {
      drink.isEdit = false
    })
  } else {
    alert('品項不能空白')
  }
}

const closeEdit = () => {
  drinks.value.forEach((drink) => {
    drink.isEdit = false
  })
}
</script>

<template>
  <div class="container">
    <table class="table my-3">
      <thead class="text-center">
        <tr>
          <th scope="col">品項</th>
          <th scope="col">描述</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="drink in drinks" :key="drink.id" class="text-center">
          <td>
            <p
              v-on:dblclick="edit(drink)"
              :style="{ display: drink.isEdit ? 'none' : 'block' }"
              class="mb-0 hover"
            >
              {{ drink.name }}
            </p>
            <div :style="{ display: drink.isEdit ? 'block' : 'none' }">
              <input type="text" v-model="tempName" class="me-2" />
              <button v-on:click="saveEdit(drink)" class="me-2">儲存</button>
              <button v-on:click="closeEdit">取消</button>
            </div>
          </td>
          <td>{{ drink.description }}</td>
          <td>{{ drink.price }}</td>
          <td>
            <button
              v-on:click="minusQty(drink.id)"
              :disabled="drink.qty < 1"
              class="btn btn-outline-danger"
            >
              -
            </button>
            <span class="mx-2">{{ drink.qty }}</span>
            <button v-on:click="addQty(drink.id)" class="btn btn-outline-primary">+</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.hover:hover {
  cursor: pointer;
}
</style>
