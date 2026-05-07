<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <div>
        <h2 class="mb-1 section-title"><i class="fas fa-list me-2"></i>거래내역</h2>
        <div class="text-muted small">{{ filtered.length }}건 / 총 {{ store.transactions.length }}건</div>
      </div>
      <button class="btn btn-gradient" @click="onAdd">
        <i class="fas fa-plus me-1"></i>거래 추가
      </button>
    </div>

    <div class="chart-card mb-3">
      <div class="row g-2">
        <div class="col-md-2">
          <label class="form-label small text-muted mb-1">구분</label>
          <select v-model="filterType" class="form-select form-select-sm">
            <option value="all">전체</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label small text-muted mb-1">카테고리</label>
          <select v-model="filterCategory" class="form-select form-select-sm">
            <option value="">전체</option>
            <option v-for="c in store.categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label small text-muted mb-1">시작일</label>
          <input type="date" v-model="dateFrom" class="form-control form-control-sm" />
        </div>
        <div class="col-md-2">
          <label class="form-label small text-muted mb-1">종료일</label>
          <input type="date" v-model="dateTo" class="form-control form-control-sm" />
        </div>
        <div class="col-md-3">
          <label class="form-label small text-muted mb-1">검색</label>
          <input v-model="search" type="text" class="form-control form-control-sm"
            placeholder="카테고리/메모 검색..." />
        </div>
        <div class="col-md-1 d-flex align-items-end">
          <button class="btn btn-sm btn-outline-secondary w-100" @click="resetFilters" title="초기화">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-4">
        <div class="chart-card text-center">
          <div class="small text-muted">필터 결과 수입</div>
          <div class="fs-5 fw-bold text-success">₩{{ summary.income.toLocaleString() }}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="chart-card text-center">
          <div class="small text-muted">필터 결과 지출</div>
          <div class="fs-5 fw-bold text-danger">₩{{ summary.expense.toLocaleString() }}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="chart-card text-center">
          <div class="small text-muted">잔액</div>
          <div class="fs-5 fw-bold" :class="summary.balance>=0?'text-primary':'text-danger'">
            ₩{{ summary.balance.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>날짜</th><th>구분</th><th>카테고리</th><th>메모</th>
              <th class="text-end">금액</th><th class="text-end" style="width:120px;">관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in filtered" :key="t.id">
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
              <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1" @click="onEdit(t)" title="수정">
                  <i class="fas fa-pen"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="onDelete(t)" title="삭제">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="6">
                <div class="empty-state">
                  <i class="fas fa-inbox d-block"></i>
                  표시할 거래가 없습니다
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <TransactionModal ref="formModal" />
    <ConfirmModal ref="confirmModal" title="거래 삭제"
      message="아래 거래를 삭제하시겠습니까?" @confirm="doDelete" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useTransactionStore } from '../stores/transactionStore';
import TransactionModal from '../components/TransactionModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

const store = useTransactionStore();
const filterType = ref('all');
const filterCategory = ref('');
const dateFrom = ref('');
const dateTo = ref('');
const search = ref('');

const formModal = ref(null);
const confirmModal = ref(null);

const filtered = computed(() =>
  store.transactions.filter(t => {
    if (filterType.value !== 'all' && t.type !== filterType.value) return false;
    if (filterCategory.value && t.category !== filterCategory.value) return false;
    if (dateFrom.value && t.date < dateFrom.value) return false;
    if (dateTo.value && t.date > dateTo.value) return false;
    if (search.value) {
      const q = search.value.toLowerCase();
      if (!((t.category + ' ' + (t.memo || '')).toLowerCase().includes(q))) return false;
    }
    return true;
  })
);

const summary = computed(() => {
  const income = filtered.value.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const expense = filtered.value.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
  return { income, expense, balance: income - expense };
});

const resetFilters = () => {
  filterType.value = 'all'; filterCategory.value = '';
  dateFrom.value = ''; dateTo.value = ''; search.value = '';
};

const onAdd = () => formModal.value.open();
const onEdit = (t) => formModal.value.open(t);
const onDelete = (t) => confirmModal.value.open(t);
const doDelete = async (t) => { await store.deleteTransaction(t.id); };

onMounted(() => { if (store.transactions.length === 0) store.fetchTransactions(); });
</script>
