<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="col-md-2 sidebar p-0">
        <div class="brand">
          <i class="fas fa-wallet me-2"></i>MyBudget
        </div>
        <ul class="nav flex-column px-3">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="fas fa-chart-pie me-2"></i>대시보드
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/transactions" class="nav-link">
              <i class="fas fa-list me-2"></i>거래내역
            </router-link>
          </li>
        </ul>
      </nav>
      <main class="col-md-10 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
</script>
