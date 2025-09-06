# Monorepo Todo App — ローカル起動手順

このリポジトリはモノレポ構成です。Nest.js バックエンドと React (Vite) フロントエンドを同一リポジトリで管理します。

## 構成
- `apps/backend` — Nest.js API サーバ（/todos CRUD, ポート: 3000）
- `apps/frontend` — React + Vite（ポート: 5173, `/api` をバックエンドへプロキシ）
  - Ant Design によるリッチUI。フィルタ/検索/優先度/期限/タグ対応、統計表示。
- ルート — npm Workspaces, Makefile, 設定ファイル

## 前提
- Node.js 18+ / npm 9+ を推奨
- 初回はリポジトリ直下で依存導入

```
npm ci
```

## 起動
- 一発同時起動（バックエンド＋フロントエンド）
```
make dev
# npm のワークスペース並列実行を使う場合
npm run dev
```
※ `make dev` はバックエンドとフロントを明示的に並列起動します。環境によって `npm run dev` の表示が片側のみになる場合は、`make dev` を推奨します。

- バックエンドのみ（開発）
```
make dev-backend
# または
npm run dev:backend
```
- フロントエンドのみ（開発）
```
make dev-frontend
# または
npm run dev:frontend
```

起動後:
- Backend: http://localhost:3000
- Frontend: http://localhost:5173 （`/api/*` -> `http://localhost:3000/*` にプロキシ）
  - 初期表示で多数のサンプルタスクが投入され、ページネーションを確認できます（メモリ保持）。
  - Ant Design テーマ適用、ダーク/ライト切替、可視化（@ant-design/plots）を追加。

## 簡易動作確認
- 作成: `POST http://localhost:3000/todos` body: `{ "title": "Buy milk", "priority":"high", "dueDate":"2025-12-31T00:00:00.000Z", "tags":["home"] }`
- 一覧: `GET http://localhost:3000/todos`
- 更新: `PATCH http://localhost:3000/todos/1` body: `{ "completed": true }`
- 削除: `DELETE http://localhost:3000/todos/1`

## ビルド
ルートから全ワークスペースをビルドします。
```
npm run build
```

## 備考
- ルート直下の `src/` は移行前の空ディレクトリです（無視して構いません）。
- 設定やトーン方針は `AGENTS.md` に記載（日本語で簡潔かつ丁寧に回答）。

## このリポジトリについて
- 本モノレポは Codex CLI を用いて初期構築・整備しました（Nest.js + React/Ant Design, Atomic Design, モノレポ構成、テーマ/ダークモード、可視化、サンプルシード等）。
