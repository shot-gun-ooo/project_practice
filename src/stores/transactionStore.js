import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchTransactions = async () => {
    loading.value = true; error.value = null;
    try {
      const { data } = await api.get('/transactions?_sort=date&_order=desc');
      transactions.value = data;
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const addTransaction = async (payload) => {
    const { data } = await api.post('/transactions', payload);
    transactions.value.unshift(data);
    transactions.value.sort((a, b) => b.date.localeCompare(a.date));
    return data;
  };

  const updateTransaction = async (id, payload) => {
    const { data } = await api.put(`/transactions/${id}`, payload);
    const idx = transactions.value.findIndex(t => t.id === id);
    if (idx !== -1) transactions.value[idx] = data;
    transactions.value.sort((a, b) => b.date.localeCompare(a.date));
    return data;
  };

  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`);
    transactions.value = transactions.value.filter(t => t.id !== id);
  };

  // 통계 (반응형 — 스토어 변경 시 차트/대시보드 자동 갱신)
  const totalIncome = computed(() =>
    transactions.value.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  );
  const totalExpense = computed(() =>
    transactions.value.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  );
  const balance = computed(() => totalIncome.value - totalExpense.value);

  const expenseByCategory = computed(() => {
    const map = {};
    transactions.value
      .filter(t => t.type === 'expense')
      .forEach(t => { map[t.category] = (map[t.category] || 0) + Number(t.amount); });
    return map;
  });

  const monthlyStats = computed(() => {
    const map = {};
    transactions.value.forEach(t => {
      const month = t.date.slice(0, 7);
      if (!map[month]) map[month] = { income: 0, expense: 0 };
      map[month][t.type] += Number(t.amount);
    });
    return Object.keys(map).sort().map(month => ({ month, ...map[month] }));
  });

  const currentMonthStats = computed(() => {
    const ym = new Date().toISOString().slice(0, 7);
    const list = transactions.value.filter(t => t.date.startsWith(ym));
    const income = list.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
    const expense = list.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
    return { ym, income, expense, balance: income - expense, count: list.length };
  });

  const categories = computed(() => {
    const set = new Set(transactions.value.map(t => t.category));
    return Array.from(set).sort();
  });

  return {
    transactions, loading, error,
    fetchTransactions, addTransaction, updateTransaction, deleteTransaction,
    totalIncome, totalExpense, balance,
    expenseByCategory, monthlyStats, currentMonthStats, categories
  };
});
