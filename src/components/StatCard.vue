<template>
  <div class="card stat-card h-100" :style="{ '--card-grad': gradient }">
    <div class="card-body d-flex align-items-center position-relative">
      <div class="stat-icon me-3" :style="{ background: gradient }">
        <i :class="icon"></i>
      </div>
      <div>
        <div class="text-muted small text-uppercase fw-semibold">{{ label }}</div>
        <div class="fs-4 fw-bold">{{ formatted }}</div>
        <div v-if="sub" class="small text-muted">{{ sub }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  label: String, value: Number, icon: String, gradient: String, sub: String
});
const formatted = computed(() => '₩ ' + (props.value || 0).toLocaleString());
</script>
