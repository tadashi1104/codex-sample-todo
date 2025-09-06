# Repository Guidelines

## プロジェクト構成とモジュール配置
- モノレポ: ルートに npm Workspaces。アプリは `apps/` 配下。
  - `apps/backend` Nest.js（API, `/todos` CRUD, シード投入あり）
  - `apps/frontend` React + Vite + Ant Design（Atomic Design 構成）
- フロント構成例: `src/components/{atoms,molecules,organisms,templates}`、`src/pages`、`src/lib`、`src/theme`、`src/styles`、`public/`。

## ビルド・テスト・開発コマンド
- 同時起動（推奨）: `make dev`（Backend+Frontend を並列起動）
- 個別起動: `make dev-backend` / `make dev-frontend`
- npm ワークスペース: `npm run dev`（並列）/ `npm run -w @app/backend start:dev`
- ビルド: ルートで `npm run build`
- フロント Lint: `npm run -w @app/frontend lint`

## コーディング規約・命名
- TypeScript 厳格。関数は小さく、SRP/副作用低減。クラス/型は `PascalCase`、関数/変数は `camelCase`、ファイルは `kebab-case`。
- Atomic Design を採用。UI プリミティブは必ず `components/atoms/*` 経由で使用。
  - 直 import 禁止対象（ESLintで検知）: AntD `Button, Input, Select, Checkbox, DatePicker, Modal`
  - 例: `import { Button } from '@/components/atoms/Button'`
- スタイルは AntD テーマ（`src/theme/brand.ts`）＋グローバル CSS を使用。ブランド色は赤基調。

## テスト方針
- 目安: カバレッジ 80% 以上。ユニット優先、モジュール境界のブラックボックステスト。
- 命名: `*.spec.ts` / `*.spec.tsx` を各アプリの `src/` 直下に配置し、対象と同階層に置く。
- E2E は将来追加（Playwright/Cypress 想定）。

## コミット・PR ガイドライン
- Conventional Commits 推奨（例: `feat(frontend): add todo editor`）。
- PR: 目的/背景、変更点、影響範囲、確認手順、スクショ（UI）、関連 Issue を記載。CI/Lint 通過必須。

## セキュリティと設定
- シークレットはコミット禁止。`.env.example` を提供し、`.env` は非追跡。
- CORS は開発用に有効。外部公開時は許可元を限定。
- サンプルデータはメモリ保持（再起動で初期化）。

## エージェント向け指示
- 日本語で簡潔かつ丁寧に回答してください。
- 本ガイドと階層ごとの `AGENTS.md` を優先。最小差分で、無関係な変更は避けること。

## テスト方針
- `tests/` は `src/` をミラー。命名は `test_*.py`（pytest）または `*.spec.ts/js`（Jest/Vitest）。
- 副作用の少ない決定的テストを優先し、モジュール境界のブラックボックスを重視。可能ならカバレッジ80%以上を目安。
- 実行: `make test` または各ツールの標準コマンド。

## コミット・PR ガイドライン
- コミットは小さく論理的に分割。可能なら Conventional Commits（例: `feat: add user search`）。
- PR は目的/背景、変更点、影響範囲、テスト/再現手順、UI はスクショ、関連Issueを明記。CI を通過させ、互換性や移行の注記があれば記載。

## セキュリティと設定
- シークレットはコミットしない。環境変数を用い、`.env.example` を提供。
- 外部入力は検証し、重要な分岐にはテストを追加。

## エージェント向け指示
- 日本語で簡潔かつ丁寧に回答してください。
- この `AGENTS.md` のスコープに従い、最小差分で修正し、無関係な変更は避けてください。
