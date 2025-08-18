<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">2025 Vue新手體驗營</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page" href="#"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/week1" class="nav-link" href="#">Week 1</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/signup" class="nav-link" href="#">Week 2</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/week3" class="nav-link" href="#">Week 3</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>
