<script setup>
import { ref, computed } from 'vue'
const data = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
  },
]
const productList = ref(data)
const cartList = ref([])
const orderList = ref([])
const remark = ref('')

const addProduct = (product) => {
  const cartItem = cartList.value.find((i) => i.id === product.id)
  if (cartItem) {
    cartItem.qty += 1
  } else {
    cartList.value.push({
      ...product,
      qty: 1,
    })
  }
}

const cartItemTotal = computed(() => {
  return cartList.value.reduce((prev, item) => prev + item.price * item.qty, 0)
});

const removeProduct = (item) => {
  cartList.value = cartList.value.filter((i) => i.id !== item.id)
}

const addOrder = () => {
  orderList.value={
    id:new Date().getTime(),
    cart:cartList.value,
    remark:remark.value,
    total:cartItemTotal.value
  }
  remark.value=''
  cartList.value=[]
  console.log(orderList);
  
}
</script>

<template>
  <div id="root">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
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
        </div>
        <div class="col-md-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" width="50">操作</th>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col" width="90">數量</th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
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
          </table>
          <div class="text-end mb-3">
            <h5>總計: <span>$ {{cartItemTotal}}</span></h5>
          </div>
          <textarea class="form-control mb-3" rows="3" placeholder="備註" v-model="remark"></textarea>
          <div class="text-end">
            <button class="btn btn-primary" @click="addOrder()">送出</button>
          </div>
        </div>
      </div>
      <hr />
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h5>訂單</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">品項</th>
                      <th scope="col">數量</th>
                      <th scope="col">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in orderList" :key="order">
                      <td>{{ order.name }}</td>
                      <td>{{ cartList.value }}</td>
                      <td>{{ cartItemTotal }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="text-end">備註: <span>{{ remark }}</span></div>
                <div class="text-end">
                  <h5>總計: <span>$145</span></h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
