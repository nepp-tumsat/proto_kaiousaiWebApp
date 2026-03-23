# コントリビューションガイド

## 触ってよい範囲（初心者・UI 担当向け）

次のディレクトリは、見た目・レイアウト・インタラクションの変更に使ってください。

- [`app/`](app/) — ページ（ルーティング）。ロジックは薄く保ち、画面の組み立て中心にします。
- [`src/features/`](src/features/) — 機能ごとの UI（マップ、タイムテーブルなど）。
- [`src/styles/`](src/styles/) および [`src/components/Map.css`](src/components/Map.css) など、スタイルに関するファイル。

**データの使い方**: 店舗・イベントなどの一覧は、**必ず** [`src/data/loaders.ts`](src/data/loaders.ts) が export する関数（例: `getShops()`, `getEvents()`）と型だけを import してください。`src/data/generated/*.json` を feature から直接 import しないでください。

## 変更前に相談・レビューが欲しい範囲

次の変更は、データ契約やビルドに影響するため、Issue や PR で一言共有してから進めてください。

- [`src/data/schema/`](src/data/schema/) — Zod によるデータの形の定義（フィールド追加・型変更）。
- [`src/data/generated/`](src/data/generated/) — パイプラインが出力する JSON（通常は `npm run ingest` で再生成）。
- [`scripts/`](scripts/) — データ取り込み・検証スクリプト。
- [`scripts/sources/`](scripts/sources/) — 編集用のソース JSON（Sheets からエクスポートしたものを置く想定）。

スキーマと生成 JSON を変えるときは、可能なら **同じ PR** にまとめ、レビューで整合を確認してください。

## データの更新手順（概要）

1. `scripts/sources/` の JSON を更新する（または Google Sheets からエクスポートして上書き）。
2. リポジトリルートで `npm run ingest` を実行し、`src/data/generated/` を再生成する。
3. `npm run build` でビルドが通ることを確認する。

詳細は [README.md](README.md) の「データパイプライン」を参照してください。
