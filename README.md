# 💰 가계부 대시보드 (Budget Dashboard)

> Vue 3 + Vite + Pinia를 활용한 모던한 개인 재무관리 웹 애플리케이션

![Vue](https://img.shields.io/badge/Vue%203-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap%205-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [사용 방법](#사용-방법)
- [개발자](#개발자)

---

## 🎯 프로젝트 소개

**가계부 대시보드**는 개인의 수입과 지출을 체계적으로 관리하고 시각화할 수 있는 웹 애플리케이션입니다.

✨ **특징:**
- 📊 실시간 통계 및 분석 대시보드
- 📈 다양한 차트로 데이터 시각화
- 🔍 거래내역 검색 및 필터링
- ⚡ 빠른 성능과 반응형 UI
- 🎨 현대적이고 직관적인 디자인

---

## 🚀 주요 기능

### 1️⃣ 대시보드 (Dashboard)
```
┌─────────────────────────────────────────┐
│  📊 통계 카드                             │
│  ├─ 💵 총 수입: 5,000,000원              │
│  ├─ 💸 총 지출: 2,500,000원              │
│  └─ 💳 현재 잔액: 2,500,000원            │
├─────────────────────────────────────────┤
│  📉 카테고리별 지출 분석 (도넛 차트)      │
│  ├─ 식비: 35%                           │
│  ├─ 교통: 20%                           │
│  ├─ 쇼핑: 25%                           │
│  └─ 기타: 20%                           │
├─────────────────────────────────────────┤
│  📈 월별 수입/지출 추이 (라인 차트)       │
│  └─ 최근 12개월 데이터 분석              │
└─────────────────────────────────────────┘
```

### 2️⃣ 거래내역 (Transactions)
| 기능 | 설명 |
|------|------|
| 📋 목록 조회 | 모든 거래내역을 시간순으로 정렬하여 표시 |
| 🔍 검색 | 거래 내용, 카테고리로 빠르게 검색 |
| 🏷️ 필터링 | 수입/지출별, 카테고리별 필터링 |
| ❌ 삭제 | 잘못된 거래내역 삭제 가능 |
| ✏️ 수정 | 거래 정보 수정 기능 |

### 3️⃣ API 통신
- RESTful API 기반 데이터 관리
- axios를 통한 안전한 HTTP 통신
- Mock 데이터 (json-server) 활용

---

## 🛠️ 기술 스택

### Frontend Framework
```javascript
// Vue 3 Composition API 예시
import { ref, computed } from 'vue'

export default {
  setup() {
    const balance = ref(2500000)
    const formattedBalance = computed(() => 
      balance.value.toLocaleString('ko-KR')
    )
    
    return { formattedBalance }
  }
}
```

### 기술 스택 테이블

| 분류 | 기술 | 버전 | 역할 |
|------|------|------|------|
| **Frontend Framework** | Vue | 3.4.0+ | UI 컴포넌트 개발 |
| **Build Tool** | Vite | 5.0.0+ | 고속 번들링 및 개발 서버 |
| **State Management** | Pinia | 2.1.7+ | 중앙 상태 관리 |
| **Router** | Vue Router | 4.2.5+ | 클라이언트 라우팅 |
| **HTTP Client** | Axios | 1.6.0+ | API 통신 |
| **UI Framework** | Bootstrap | 5.3.2+ | 반응형 레이아웃 |
| **Icons** | Font Awesome | 6.5.1+ | 아이콘 라이브러리 |
| **Charts** | Google Charts | - | 데이터 시각화 |
| **Mock API** | json-server | 0.17.4+ | 개발용 REST API |

### 언어 구성

| 언어 | 비율 | 라인 수 |
|------|------|--------|
| Vue | 76.2% | ~500줄 |
| JavaScript | 12.8% | ~80줄 |
| CSS | 9.9% | ~65줄 |
| HTML | 1.1% | ~30줄 |

---

## 📁 프로젝트 구조

```
project_practice/
├── 📄 package.json              # 프로젝트 메타데이터
├── 📄 package-lock.json         # 의존성 고정 버전
├── 📄 vite.config.js            # Vite 설정
├── 📄 index.html                # HTML 진입점
├── 📄 db.json                   # Mock 데이터 (100개 샘플 거래내역)
│
├── 📂 src/
│   ├── 📄 main.js               # Vue 애플리케이션 진입점
│   ├── 📄 App.vue               # 루트 컴포넌트
│   │
│   ├── 📂 router/
│   │   └── 📄 index.js          # 라우팅 설정
│   │
│   ├── 📂 services/
│   │   └── 📄 api.js            # Axios 인스턴스
│   │       └── baseURL: http://localhost:3001
│   │
│   ├── 📂 stores/               # Pinia Store
│   │   └── 📄 transactionStore.js
│   │       ├── state: transactions[]
│   │       ├── actions: fetchTransactions()
│   │       ├── actions: addTransaction()
│   │       ├── actions: deleteTransaction()
│   │       └── getters: totalIncome, totalExpense
│   │
│   ├── 📂 views/                # 페이지 컴포넌트
│   │   ├── 📄 Dashboard.vue     # 대시보드
│   │   │   ├── 통계 카드
│   │   │   ├── 도넛 차트
│   │   │   └── 라인 차트
│   │   │
│   │   └── 📄 Transactions.vue  # 거래내역 페이지
│   │       ├── 거래내역 목록
│   │       ├── 검색 / 필터
│   │       └── 삭제 기능
│   │
│   └── 📂 components/           # 재사용 컴포넌트
│       ├── 📄 StatCard.vue      # 통계 카드
│       ├── 📄 PieChart.vue      # Google PieChart
│       └── 📄 LineChart.vue     # Google LineChart
│
├── 📂 node_modules/             # 의존성 모듈
└── 📂 dist/                     # 빌드 출력물
```

### 컴포넌트 구성도 (Mermaid)

```mermaid
componentDiagram
  direction LR

  %% App & routing
  main[main.js] --> app[App.vue]
  app --> router[router/index.js]
  router --> dashboard[views/Dashboard.vue]
  router --> transactions[views/Transactions.vue]

  %% Views -> shared components
  dashboard --> statcard[components/StatCard.vue]
  dashboard --> piechart[components/PieChart.vue]
  dashboard --> linechart[components/LineChart.vue]

  %% State management & data fetching
  dashboard --> store[stores/transactionStore.js]
  transactions --> store
  store --> api[services/api.js]
  api --> jsonserver[json-server (Mock API)]

  %% Charts rendering library
  piechart --> googlecharts[Google Charts]
  linechart --> googlecharts
```

### 핵심 파일 설명

#### `src/stores/transactionStore.js` - 상태 관리
```javascript
import { defineStore } from 'pinia'
import api from '../services/api'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchTransactions() {
      this.loading = true
      const response = await api.get('/transactions')
      this.transactions = response.data
    },
    
    async deleteTransaction(id) {
      await api.delete(`/transactions/${id}`)
      await this.fetchTransactions()
    }
  },
  
  getters: {
    totalIncome: (state) => {
      return state.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
    },
    totalExpense: (state) => {
      return state.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    }
  }
})
```

#### `src/services/api.js` - API 설정
```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
```

---

## 📥 설치 및 실행

### 전제 조건
- Node.js 16.0 이상
- npm 7.0 이상

### 1️⃣ 설치 (Installation)

```bash
# 저장소 클론
git clone https://github.com/shot-gun-ooo/project_practice.git
cd project_practice

# 의존성 설치
npm install
```

### 2️⃣ 개발 모드 실행 (Development Mode)

#### 옵션 A: 한 번에 실행 (권장)
```bash
# json-server(3001) + Vite(5173) 동시 실행
npm start
```

#### 옵션 B: 개별 실행
```bash
# 터미널 1: Mock API 서버
npm run server        # http://localhost:3001

# 터미널 2: 개발 서버
npm run dev           # http://localhost:5173
```

### 3️⃣ 빌드 (Production Build)

```bash
# 최적화된 번들 생성
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 💻 사용 방법

### 🏠 대시보드 페이지 접속
1. 브라우저에서 `http://localhost:5173` 접속
2. 좌측 네비게이션에서 "대시보드" 클릭
3. 📊 통계 카드와 📈 차트를 통해 재무 현황 파악

### 📋 거래내역 관리
```
1. "거래내역" 메뉴 클릭
2. 수입/지출별 필터링 또는 검색
3. 거래 내용 확인 및 필요시 삭제
4. 카테고리별 분석으로 지출 패턴 파악
```

### 🔍 데이터 필터링 예시

```javascript
// 지출만 조회
const expenses = transactions.filter(t => t.type === 'expense')

// 특정 카테고리 조회
const foodExpense = transactions.filter(t => 
  t.category === '식비' && t.type === 'expense'
)

// 금액 범위로 조회
const largeTransaction = transactions.filter(t => 
  t.amount >= 100000
)
```

---

## 📊 샘플 데이터 구조

```json
{
  "transactions": [
    {
      "id": 1,
      "type": "income",
      "category": "급여",
      "amount": 3000000,
      "description": "월급",
      "date": "2026-05-01"
    },
    {
      "id": 2,
      "type": "expense",
      "category": "식비",
      "amount": 45000,
      "description": "점심 식사",
      "date": "2026-05-02"
    }
  ]
}
```

---

## 🎨 주요 페이지 미리보기

### 대시보드
```
┌────────────────────────────────────────────────────────────┐
│ 💰 가계부 대시보드                                           │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │💵 총 수입     │  │💸 총 지출     │  │💳 현재 잔액   │     │
│  │5,000,000원   │  │2,500,000원   │  │2,500,000원   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐         │
│  │  📉 카테고리별 지출   │  │  📈 월별 추이       │         │
│  │                     │  │                     │         │
│  │    ◎ 식비 35%       │  │ 수입  ↗ ━━━━━━     │         │
│  │    ◎ 교통 20%       │  │                     │         │
│  │    ◎ 쇼핑 25%       │  │ 지출  ↘ ━━━━━━     │         │
│  │    ◎ 기타 20%       │  │                     │         │
│  └─────────────────────┘  └─────────────────────┘         │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### 거래내역
```
┌────────────────────────────────────────────────────────────┐
│ 📋 거래내역 관리                                             │
├────────────────────────────────────────────────────────────┤
│ 🔍 검색: [_______________]  🏷️ 필터: [수입▼]               │
├────────────────────────────────────────────────────────────┤
│ 날짜        │ 분류 │ 카테고리 │ 금액      │ 설명  │ 액션   │
├─────────────┼─────┼─────────┼──────────┼──────┼────────┤
│ 2026-05-01  │ 수입 │ 급여    │ +3,000K │ 월급  │ ❌     │
│ 2026-05-02  │ 지출 │ 식비    │ -45K    │ 점심  │ ❌     │
│ 2026-05-03  │ 지출 │ 교통    │ -5.5K   │ 버스  │ ❌     │
│ ...         │ ... │ ...    │ ...    │ ... │ ...    │
└────────────────────────────────────────────────────────────┘
```

---

## 🔧 개발 팁

### 상태 추가하기
```javascript
// transactionStore.js에 새로운 getter 추가
getters: {
  averageExpense: (state) => {
    const expenses = state.transactions
      .filter(t => t.type === 'expense')
    return expenses.length > 0 
      ? expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length
      : 0
  }
}
```

### 새로운 API 엔드포인트 추가
```javascript
// services/api.js
export const getTransactionById = (id) => api.get(`/transactions/${id}`)
export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data)
export const createTransaction = (data) => api.post('/transactions', data)
```

### 새 컴포넌트 생성
```javascript
<!-- components/ExpenseChart.vue -->
<template>
  <div class="chart-container">
    <h3>📊 지출 분석</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const chartCanvas = ref(null)

onMounted(() => {
  // Chart.js 초기화
})
</script>
```

---

## 📚 참고 자료

- [Vue 3 공식 문서](https://vuejs.org/)
- [Vite 공식 문서](https://vitejs.dev/)
- [Pinia 공식 문서](https://pinia.vuejs.org/)
- [Bootstrap 5 공식 문서](https://getbootstrap.com/)
- [json-server](https://github.com/typicode/json-server)

---

## 📝 라이선스

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 개발자

**shot-gun-ooo** - [GitHub Profile](https://github.com/shot-gun-ooo)

---

## 🙏 기여 (Contribution)

풀 리퀘스트는 언제나 환영합니다! 주요 변경 사항의 경우 먼저 issue를 열어 변경 사항을 설명해주세요.

```bash
1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
```

---

## 📞 문의 및 지원

질문이나 버그 리포트는 GitHub Issues를 통해 남겨주세요.

**마지막 업데이트:** 2026-05-07  
**버전:** 1.0.0

---

<div align="center">

**⭐ 도움이 되었다면 이 저장소에 별을 주세요!**

[⬆ 맨 위로](#-가계부-대시보드-budget-dashboard)

</div>
