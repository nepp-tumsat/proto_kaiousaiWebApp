# アーキテクチャ

## プロジェクト構造

```
kaiousaiApp/
├── public/                 # 静的ファイル（images, icons, manifest.json など）
├── src/
│   ├── app/                # Next.js App Router（ページ・レイアウト）
│   ├── features/           # 機能単位の UI（マップ、タイムテーブルなど）
│   ├── data/               # データ・スキーマ・生成 JSON
│   ├── lib/                # 共有ユーティリティ
│   └── styles/             # グローバルスタイル
├── scripts/                # データ取り込みなど
├── .github/workflows/      # GitHub Actions
└── docs/                   # ドキュメント
```

## コンポーネント構成

### ページ（`src/app/`）

- ルートとレイアウト（フッターナビなど）
- 重いクライアントコンポーネントは `src/features/` を dynamic import する場合あり

### 機能 UI（`src/features/`）

- **map** — Leaflet マップ、店舗ポップアップ
- **timetable** — 企画一覧（タイムテーブル）

## データフロー

```
JSON（src/data/generated/）
    ↓
loaders（src/data/loaders.ts）
    ↓
feature コンポーネント
    ↓
UI表示
```

## 状態管理

- **ローカル状態**: Reactの`useState`など
- **グローバル状態**: 必要最小限（現状は主にローカル）

## スタイリング戦略

- **feature 単位のCSS** — 各 feature ディレクトリ内で import
- **グローバルスタイル** — `globals.css` / `App.css` をルートレイアウトで読み込み

## ビルドプロセス

1. **`npm run prebuild`**（データ取り込み `ingest`）
2. **`next build`** — 静的エクスポート（`out/`）

## デプロイフロー

```
Git Push
    ↓
GitHub Actions（自動トリガー）
    ↓
npm run build
    ↓
out/ を GitHub Pages にデプロイ
```

## パフォーマンス考慮事項

- **コード分割** — Next.js / dynamic import
- **画像最適化** — 必要に応じた遅延読み込み
- **バンドルサイズ** — 依存関係の見直し
