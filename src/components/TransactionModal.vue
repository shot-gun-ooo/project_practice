<template>
  <div class="modal fade" ref="modalEl" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg" style="border-radius:18px;">
        <div class="modal-header" style="background:var(--grad-primary);color:#fff;border-radius:18px 18px 0 0;">
          <h5 class="modal-title">
            <i class="fas" :class="isEdit ? 'fa-pen' : 'fa-plus-circle'"></i>
            {{ isEdit ? '거래 수정' : '거래 추가' }}
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="hide"></button>
        </div>
        <form @submit.prevent="submit" novalidate>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label fw-semibold">구분</label>
              <div class="btn-group w-100" role="group">
                <input type="radio" class="btn-check" id="t-income" value="income" v-model="form.type">
                <label class="btn btn-outline-success" for="t-income"><i class="fas fa-arrow-up me-1"></i>수입</label>
                <input type="radio" class="btn-check" id="t-expense" value="expense" v-model="form.type">
                <label class="btn btn-outline-danger" for="t-expense"><i class="fas fa-arrow-down me-1"></i>지출</label>
              </div>
            </div>

            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold">날짜 <span class="text-danger">*</span></label>
                <input type="date" class="form-control" v-model="form.date"
                  :class="{'is-invalid': errors.date}" :max="today" />
                <div class="invalid-feedback">{{ errors.date }}</div>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">금액 (₩) <span class="text-danger">*</span></label>
                <input type="number" class="form-control" v-model.number="form.amount"
                  :class="{'is-invalid': errors.amount}" min="1" step="1" placeholder="0" />
                <div class="invalid-feedback">{{ errors.amount }}</div>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">카테고리 <span class="text-danger">*</span></label>
                <input list="cat-list" class="form-control" v-model="form.category"
                  :class="{'is-invalid': errors.category}" maxlength="20" placeholder="예: 식비" />
                <datalist id="cat-list">
                  <option v-for="c in categories" :key="c" :value="c" />
                </datalist>
                <div class="invalid-feedback">{{ errors.category }}</div>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">메모</label>
                <input type="text" class="form-control" v-model="form.memo" maxlength="100"
                  :class="{'is-invalid': errors.memo}" placeholder="선택사항" />
                <div class="invalid-feedback">{{ errors.memo }}</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" @click="hide">취소</button>
            <button type="submit" class="btn btn-gradient" :disabled="saving">
              <i class="fas fa-save me-1"></i>{{ saving ? '저장중...' : '저장' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';
import * as bootstrap from 'bootstrap';
import { useTransactionStore } from '../stores/transactionStore';

const store = useTransactionStore();
const categories = computed(() => store.categories);

const modalEl = ref(null);
let modal = null;

const today = new Date().toISOString().slice(0, 10);
const emptyForm = () => ({ id: null, type: 'expense', date: today, amount: null, category: '', memo: '' });
const form = reactive(emptyForm());
const errors = reactive({});
const saving = ref(false);
const isEdit = computed(() => !!form.id);

const validate = () => {
  Object.keys(errors).forEach(k => delete errors[k]);
  if (!form.date) errors.date = '날짜를 선택하세요';
  else if (form.date > today) errors.date = '미래 날짜는 사용할 수 없습니다';
  if (form.amount === null || form.amount === '' || isNaN(form.amount)) errors.amount = '금액을 입력하세요';
  else if (Number(form.amount) <= 0) errors.amount = '0보다 큰 값을 입력하세요';
  else if (Number(form.amount) > 100000000) errors.amount = '1억원 이하로 입력하세요';
  const cat = (form.category || '').trim();
  if (!cat) errors.category = '카테고리를 입력하세요';
  else if (cat.length > 20) errors.category = '20자 이내로 입력하세요';
  if (form.memo && form.memo.length > 100) errors.memo = '100자 이내';
  return Object.keys(errors).length === 0;
};

const submit = async () => {
  if (!validate()) return;
  saving.value = true;
  try {
    const payload = {
      type: form.type,
      date: form.date,
      amount: Number(form.amount),
      category: form.category.trim(),
      memo: (form.memo || '').trim()
    };
    if (isEdit.value) await store.updateTransaction(form.id, payload);
    else await store.addTransaction(payload);
    hide();
  } catch (e) {
    alert('저장 실패: ' + e.message);
  } finally {
    saving.value = false;
  }
};

const open = (t) => {
  Object.assign(form, emptyForm());
  if (t) Object.assign(form, { ...t });
  Object.keys(errors).forEach(k => delete errors[k]);
  modal.show();
};
const hide = () => modal.hide();

onMounted(() => { modal = new bootstrap.Modal(modalEl.value); });

defineExpose({ open });
</script>
