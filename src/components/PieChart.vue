<template>
  <div ref="chartEl" class="g-chart"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';

const props = defineProps({ data: Object, title: String });
const chartEl = ref(null);
let chart = null;
let ro = null;
let ready = false;

const draw = () => {
  if (!ready || !chartEl.value) return;
  const entries = Object.entries(props.data || {});
  if (entries.length === 0) {
    chartEl.value.innerHTML = '<div class="empty-state"><i class="fas fa-chart-pie"></i><div>데이터 없음</div></div>';
    return;
  }
  const rows = [['카테고리', '금액'], ...entries];
  const dt = window.google.visualization.arrayToDataTable(rows);
  const options = {
    title: props.title || '',
    pieHole: 0.45,
    chartArea: { width: '92%', height: '82%' },
    legend: { position: 'right', textStyle: { fontSize: 12 } },
    backgroundColor: 'transparent',
    pieSliceBorderColor: '#fff',
    colors: ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#8b5cf6','#14b8a6','#f97316','#84cc16','#a855f7','#06b6d4']
  };
  if (!chart) chart = new window.google.visualization.PieChart(chartEl.value);
  chart.draw(dt, options);
};

const init = () => {
  window.google.charts.load('current', { packages: ['corechart'] });
  window.google.charts.setOnLoadCallback(() => { ready = true; draw(); });
};

onMounted(() => {
  init();
  ro = new ResizeObserver(() => nextTick(draw));
  ro.observe(chartEl.value);
  window.addEventListener('resize', draw);
});
onBeforeUnmount(() => {
  ro && ro.disconnect();
  window.removeEventListener('resize', draw);
});
watch(() => props.data, () => draw(), { deep: true });
</script>

<style scoped>
.g-chart { width: 100%; height: 340px; min-height: 280px; }
@media (max-width: 768px) { .g-chart { height: 280px; } }
</style>
