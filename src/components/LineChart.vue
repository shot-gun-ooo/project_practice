<template>
  <div ref="chartEl" class="g-chart"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';

const props = defineProps({ data: Array, title: String });
const chartEl = ref(null);
let chart = null;
let ro = null;
let ready = false;

const draw = () => {
  if (!ready || !chartEl.value) return;
  const data = props.data || [];
  if (data.length === 0) {
    chartEl.value.innerHTML = '<div class="empty-state"><i class="fas fa-chart-line"></i><div>데이터 없음</div></div>';
    return;
  }
  const rows = [['월', '수입', '지출']];
  data.forEach(d => rows.push([d.month, d.income, d.expense]));
  const dt = window.google.visualization.arrayToDataTable(rows);
  const options = {
    title: props.title || '',
    chartArea: { width: '85%', height: '72%' },
    legend: { position: 'top', alignment: 'end' },
    backgroundColor: 'transparent',
    colors: ['#10b981', '#ef4444'],
    hAxis: { title: '월', textStyle: { fontSize: 11 } },
    vAxis: { title: '금액 (₩)', format: 'short' },
    curveType: 'function',
    pointSize: 6,
    lineWidth: 3
  };
  if (!chart) chart = new window.google.visualization.AreaChart(chartEl.value);
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
