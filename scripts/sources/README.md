# データソース（編集用）

ここに置いた JSON を `npm run ingest` が検証し、`src/data/generated/` に書き出します。

- `shops.json` — 模擬店・マップピン用
- `events.json` — タイムテーブル用

Google Sheets からエクスポートする場合は、**このディレクトリの形に合わせて**列をマッピングするか、スプレッドシート用のエクスポートスクリプトを別途用意してください。フィールドを増やすときは `src/data/schema/` の Zod 定義も更新が必要です。
