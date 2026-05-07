<template>
  <div class="modal fade" ref="modalEl" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg" style="border-radius:18px;">
        <div class="modal-header" style="background:var(--grad-danger);color:#fff;border-radius:18px 18px 0 0;">
          <h5 class="modal-title"><i class="fas fa-exclamation-triangle me-2"></i>{{ title }}</h5>
          <button type="button" class="btn-close btn-close-white" @click="hide"></button>
        </div>
        <div class="modal-body">
          <p class="mb-2">{{ message }}</p>
          <div v-if="detail" class="bg-light p-3 rounded small">
            <div><strong>날짜:</strong> {{ detail.date }}</div>
            <div><strong>카테고리:</strong> {{ detail.category }}</div>
            <div><strong>금액:</strong> ₩{{ Number(detail.amount).toLocaleString() }}</div>
            <div v-if="detail.memo"><strong>메모:</strong> {{ detail.memo }}</div>
          </div>
          <p class="text-danger mt-3 mb-0 small">
            <i class="fas fa-info-circle me-1"></i>이 작업은 되돌릴 수 없습니다.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" @click="hide">취소</button>
          <button type="button" class="btn btn-danger" @click="confirm">
            <i class="fas fa-trash me-1"></i>삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as bootstrap from 'bootstrap';

const props = defineProps({
  title: { type: String, default: '삭제 확인' },
  message: { type: String, default: '정말 삭제하시겠습니까?' }
});
const emit = defineEmits(['confirm']);

const modalEl = ref(null);
let modal = null;
const detail = ref(null);
let payload = null;

const open = (item) => { detail.value = item; payload = item; modal.show(); };
const hide = () => modal.hide();
const confirm = () => { emit('confirm', payload); hide(); };

onMounted(() => { modal = new bootstrap.Modal(modalEl.value); });
defineExpose({ open });
</script>
