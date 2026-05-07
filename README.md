# 가계부 대시보드 (Vue 3 + json-server)

## 기술 스택
- Vue 3 (Composition API, ES6+)
- Vite
- Pinia (상태관리, `src/stores/transactionStore.js`)
- Vue Router 4
- Axios (`src/services/api.js`)
- json-server (Mock REST API)
- Bootstrap 5
- Google Charts (PieChart, LineChart)
- Font Awesome 아이콘

## 실행 방법

```bash
npm install
npm start          # json-server(3001) + vite(5173) 동시 실행
```

또는 따로 실행:
```bash
npm run server     # http://localhost:3001
npm run dev        # http://localhost:5173
```

## 프로젝트 구조

```
src/
├── main.js
├── App.vue
├── router/index.js
├── services/api.js              # axios 인스턴스 (baseURL: localhost:3001)
├── stores/
│   └── transactionStore.js      # Pinia + axios로 json-server 연결
├── views/
│   ├── Dashboard.vue            # 대시보드 (통계 카드 + 차트)
│   └── Transactions.vue         # 거래내역 목록
└── components/
    ├── StatCard.vue
    ├── PieChart.vue             # Google PieChart
    └── LineChart.vue            # Google LineChart
db.json                          # 100개 샘플 거래내역
```

## 주요 기능
- 총 수입 / 총 지출 / 잔액 통계 카드
- 카테고리별 지출 도넛 차트 (Google Charts)
- 월별 수입/지출 라인 차트
- 거래내역 검색 / 필터 / 삭제
- json-server CRUD (axios)
