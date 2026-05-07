<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <div>
        <h2 class="mb-1 section-title"><i class="fas fa-chart-pie me-2"></i>대시보드</h2>
        <div class="text-muted small">실시간 자동 갱신 · {{ store.transactions.length }}건의 거래</div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-light border" @click="store.fetchTransactions">
          <i class="fas fa-sync me-1"></i>새로고침
        </button>
        <button class="btn btn-gradient" @click="modal.open()">
          <i class="fas fa-plus me-1"></i>거래 추가
        </button>
      </div>
    </div>

    <div v-if="store.loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>
    <div v-else-if="store.error" class="alert alert-danger">
      <i class="fas fa-exclamation-triangle me-2"></i>{{ store.error }}
      <div class="small mt-1">json-server를 실행하세요: <code>npm run server</code></div>
    </div>

    <template v-else>
      <div class="row g-3 mb-4">
        <div class="col-md-6 col-lg-3">
          <StatCard label="총 수입" :value="store.totalIncome"
            icon="fas fa-arrow-up" gradient="var(--grad-success)" />
        </div>
        <div class="col-md-6 col-lg-3">
          <StatCard label="총 지출" :value="store.totalExpense"
            icon="fas fa-arrow-down" gradient="var(--grad-danger)" />
        </div>
        <div class="col-md-6 col-lg-3">
          <StatCard label="잔액" :value="store.balance"
            icon="fas fa-wallet" gradient="var(--grad-info)" />
        </div>
        <div class="col-md-6 col-lg-3">
          <StatCard :label="`이번달(${store.currentMonthStats.ym})`"
            :value="store.currentMonthStats.balance"
            :sub="`수입 ₩${store.currentMonthStats.income.toLocaleString()} · 지출 ₩${store.currentMonthStats.expense.toLocaleString()}`"
            icon="fas fa-calendar-day" gradient="var(--grad-primary)" />
        </div>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-lg-6">
          <div class="chart-card h-100">
            <h6 class="text-muted mb-2"><i class="fas fa-chart-pie me-1"></i> 카테고리별 지출</h6>
            <PieChart :data="store.expenseByCategory" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="chart-card h-100">
            <h6 class="text-muted mb-2"><i class="fas fa-chart-area me-1"></i> 월별 수입/지출 추이</h6>
            <LineChart :data="store.monthlyStats" />
          </div>
        </div>
      </div>

      <div class="chart-card mb-4">
        <h6 class="text-muted mb-3"><i class="fas fa-table me-1"></i> 월별 요약</h6>
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead><tr><th>월</th><th class="text-end">수입</th><th class="text-end">지출</th><th class="text-end">잔액</th></tr></thead>
            <tbody>
              <tr v-for="m in [...store.monthlyStats].reverse().slice(0,6)" :key="m.month">
                <td class="fw-semibold">{{ m.month }}</td>
                <td class="text-end text-success">₩{{ m.income.toLocaleString() }}</td>
                <td class="text-end text-danger">₩{{ m.expense.toLocaleString() }}</td>
                <td class="text-end fw-bold" :class="m.income-m.expense>=0?'text-primary':'text-danger'">
                  ₩{{ (m.income - m.expense).toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="chart-card">
        <h6 class="text-muted mb-3"><i class="fas fa-clock me-1"></i> 최근 거래내역</h6>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr><th>날짜</th><th>구분</th><th>카테고리</th><th>메모</th><th class="text-end">금액</th></tr>
            </thead>
            <tbody>
              <tr v-for="t in recent" :key="t.id">
                <td>{{ t.date }}</td>
                <td>
                  <span class="badge" :class="t.type==='income'?'badge-soft-success':'badge-soft-danger'">
                    {{ t.type === 'income' ? '수입' : '지출' }}
                  </span>
                </td>
                <td>{{ t.category }}</td>
                <td class="text-muted">{{ t.memo }}</td>
                <td class="text-end fw-bold" :class="t.type==='income'?'text-success':'text-danger'">
                  {{ t.type==='income'?'+':'-' }}₩{{ Number(t.amount).toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <TransactionModal ref="modal" />
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useTransactionStore } from '../stores/transactionStore';
import StatCard from '../components/StatCard.vue';
import PieChart from '../components/PieChart.vue';
import LineChart from '../components/LineChart.vue';
import TransactionModal from '../components/TransactionModal.vue';

const store = useTransactionStore();
const modal = ref(null);
const recent = computed(() => store.transactions.slice(0, 8));

onMounted(() => { if (store.transactions.length === 0) store.fetchTransactions(); });
</script>
