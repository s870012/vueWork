<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const api = import.meta.env.VITE_BASE_URL
const router = useRouter()

// 切換
const isSignup = ref(false)
const switchSignUp = (status) => {
  isSignup.value = status
}

// 註冊
const signupField = ref({
  email: '',
  password: '',
  nickname: '',
})

const handleSignUp = async (signupField) => {
  try {
    await axios.post(`${api}users/sign_up`, signupField)
    isSignup.value = false
  } catch (error) {
    console.log('錯誤', error)
    alert('註冊失敗')
  }
}

// 登入
const signInField = ref({
  email: '',
  password: '',
})

const signInRes = ref('')

const handleSignIn = async (signInField) => {
  try {
    const res = await axios.post(`${api}users/sign_in`, signInField)
    signInRes.value = res.data.token
    document.cookie = `TodoToken=${res.data.token};path=/`
    router.push('/todo')
  } catch (error) {
    console.log('錯誤', error)
    alert('登入失敗')
  }
}
</script>

<template>
  <div class="container text-center mt-5">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal" v-if="isSignup">註冊</h1>
      <h1 class="h3 mb-3 font-weight-normal" v-else>登入</h1>
      <div class="col-8">
        <!-- 註冊 Form -->
        <form id="form" class="form-signin" v-if="isSignup">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              v-model="signupField.email"
              required
              autoFocus
            />
            <label for="email">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="signupField.password"
              required
            />
            <label for="password">Password</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="nickname"
              placeholder="nickname"
              v-model="signupField.nickname"
              required
            />
            <label for="nickname">Nickname</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            @click.prevent="handleSignUp(signupField)"
          >
            註冊
          </button>
          <button
            class="btn btn-lg btn-outline-dark w-100 mt-3"
            type="submit"
            @click="switchSignUp(false)"
          >
            登入
          </button>
        </form>
        <!-- 登入 Form -->
        <form id="form" class="form-signin" v-else>
          <div class="form-floating mb-3">
            <input
              type="mail"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              v-model="signInField.email"
              required
              autoFocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="signInField.password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            @click.prevent="handleSignIn(signInField)"
          >
            登入
          </button>
          <button
            class="btn btn-lg btn-outline-dark w-100 mt-3"
            type="submit"
            @click="switchSignUp(true)"
          >
            前往註冊
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
