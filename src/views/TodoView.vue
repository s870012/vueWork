<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const api = import.meta.env.VITE_BASE_URL
const router = useRouter()
const isLogin = ref({
  require: false,
  text: '',
})

// 驗證 + 取得代辦事項
const token = document.cookie.replace(/(?:^|.*;\s*)TodoToken\s*=\s*([^;]*).*$/i, '$1')
onMounted(async () => {
  try {
    await axios.get(`${api}users/checkout`, {
      headers: {
        Authorization: token,
      },
    })
    getTodo()
    isLogin.value = {
      require: true,
      text: '登入成功!',
    }
    setTimeout(() => {
      isLogin.value.require = false
    }, 1000)
  } catch (error) {
    console.log('錯誤', error)
    router.push('/signup')
  }
})

// 取得Todo
const todoList = ref([])
const getTodo = async () => {
  try {
    const res = await axios.get(`${api}todos/`, {
      headers: {
        Authorization: token,
      },
    })
    todoList.value = res.data.data.map((todo) => ({
      ...todo,
      isEdit: false,
    }))
  } catch (error) {
    console.log(error)
  }
}

// 新增Todo
const todoContent = ref({
  content: '',
})
const addTodo = async (todoContent) => {
  try {
    await axios.post(`${api}todos/`, todoContent, {
      headers: {
        Authorization: token,
      },
    })
    getTodo()
    todoContent.content = ''
    isLogin.value = {
      require: true,
      text: '新增成功!',
    }
    setTimeout(() => {
      isLogin.value.require = false
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}

// 刪除 Todo
const deleteTodo = async (id) => {
  try {
    await axios.delete(`${api}todos/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    getTodo()
    isLogin.value = {
      require: true,
      text: '刪除成功!',
    }
    setTimeout(() => {
      isLogin.value.require = false
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}

// editTodo
const tempTodo = ref({
  content: '',
})
const toggleEdit = (todo) => {
  const index = todoList.value.findIndex((i) => i.id === todo.id)
  todoList.value[index].isEdit = true
  tempTodo.value = todo.content
}

const editTodo = async (todo) => {
  const index = todoList.value.findIndex((i) => i.id === todo.id)
  todoList.value[index].content = tempTodo.value

  try {
    await axios.put(`${api}todos/${todo.id}`, todo, {
      headers: {
        Authorization: token,
      },
    })
    getTodo()
    isLogin.value = {
      require: true,
      text: '編輯成功!',
    }
    setTimeout(() => {
      isLogin.value.require = false
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}

const closeEdit = (id) => {
  const index = todoList.value.findIndex((i) => i.id === id)
  todoList.value[index].isEdit = false
}

// todo status
const toggleTodo = async (todo) => {
  try {
    await axios.patch(`${api}todos/${todo.id}/toggle`, null, {
      headers: {
        Authorization: token,
      },
    })
    console.log('代辦事項完成')
  } catch (error) {
    console.log(error)
  }
}

// 登出
const signOutTodo = async () => {
  try {
    await axios.post(`${api}users/sign_out`, null, {
      headers: {
        Authorization: token,
      },
    })
    document.cookie = 'TodoToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    isLogin.value = {
      require: true,
      text: '登出成功!',
    }
    setTimeout(() => {
      isLogin.value.require = false
    }, 1000)
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div
    class="position-fixed top-25 end-0 p-3 rounded-2"
    :style="{ zIndex: '2000', backgroundColor: '#FFD370' }"
    v-show="isLogin.require"
  >
    <div class="toast-body">{{ isLogin.text }}</div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-10 mx-auto my-5">
        <h1 class="text-center">TodoList</h1>
        <button type="button" class="btn btn-primary d-block ms-auto" @click="signOutTodo">
          登出
        </button>
        <div class="input-group my-3">
          <input
            type="text"
            class="form-control border-dark"
            placeholder="新增代辦事項"
            v-model="todoContent.content"
          />
          <button type="button" class="btn btn-dark px-5" @click="addTodo(todoContent)">
            新增
          </button>
        </div>
        <h2 v-if="!todoList.length" class="text-center text-black-50">無代辦事項</h2>
        <div v-for="todo in todoList" :key="todo.id">
          <ul class="list-group">
            <li class="list-group-item d-flex align-items-center justify-content-between">
              <div class="input-group">
                <input
                  class="me-2"
                  type="checkbox"
                  v-model="todo.status"
                  @change="toggleTodo(todo)"
                />
                <span v-if="!todo.isEdit">{{ todo.content }}</span>
                <input type="text" v-model="tempTodo" v-else class="form-control me-1" />
              </div>
              <div class="d-flex text-nowrap">
                <button
                  type="button"
                  class="btn btn-primary me-1"
                  @click="toggleEdit(todo)"
                  v-show="!todo.isEdit"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-success me-1"
                  @click="editTodo(todo)"
                  v-show="todo.isEdit"
                >
                  確定
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="closeEdit(todo.id)"
                  v-show="todo.isEdit"
                >
                  取消
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteTodo(todo.id)"
                  v-show="!todo.isEdit"
                >
                  刪除
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
