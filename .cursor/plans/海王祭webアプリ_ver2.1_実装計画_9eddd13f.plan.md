---
name: 海王祭Webアプリ Ver2.1 実装計画
overview: 既存のViteベースMVPを起点に、要件定義書Ver 2.1に沿ったNext.jsアプリへ段階的に進化させるための実行計画です。2〜3人チーム・約1〜1.5ヶ月を想定し、優先度順に実装フェーズを分解します。
todos:
  - id: phase1-nextjs-setup
    content: Next.js(App Router) プロジェクト作成とFeature-first構成への土台移行
    status: completed
  - id: phase2-top-nav
    content: トップページ機能ランチャーと共通ヘッダー/フッターの実装
    status: completed
  - id: phase3-map-extend
    content: マップ機能の屋内外切替・ピン拡張・NePP強調実装
    status: completed
  - id: phase4-search-drawer
    content: Fuse.js検索・カテゴリフィルタ・Vaulドロワー実装
    status: in_progress
  - id: phase5-sheets-zod
    content: Google Sheets連携スクリプトとZodバリデーション導入
    status: pending
  - id: phase6-pwa-ux
    content: モバイルファースト調整とPWA(Manifest/スプラッシュ)対応
    status: pending
  - id: phase7-quality-docs
    content: Lint/Format設定・テスト・運用ドキュメント整備
    status: pending
isProject: false
---

## ゴールイメージ

- **技術基盤**: Next.js(App Router) + TypeScript Strict + Tailwind、Cloudflare Pages向け静的出力構成。
- **機能面**: トップメニュー、屋外マップ＋簡易屋内マップ、ピン表示、Fuse.js検索、カテゴリフィルタ、詳細ドロワー(Vaul)、NePP強調演出までを実装。
- **データ面**: Google Sheets 連携でビルド時にJSON生成し、Zodでバリデーション・ビルド失敗制御を行う。
- **UX/非機能**: スマホファーストレイアウト、公式HP風ヘッダー&フッター、PWA対応(manifest・アイコン・スプラッシュ)を整える。

---

## フェーズ1: 基盤リプレイスと最小ルーティング

- **目的**: ViteベースMVPを壊さずに、Next.js(App Router) & Feature-first構成へ土台を移行する。
- **タスク**:
  - **Next.js プロジェクト新規作成**
    - `apps/web` などに Next.js(App Router) プロジェクトを作成。
    - TypeScript Strict 有効化、Tailwind 導入。
  - **Feature-first ディレクトリ設計**
    - 例: `src/features/map`, `src/features/home`, `src/features/timetable` を定義。
    - `app/` 直下はルーティングのみにし、ページから各 feature のコンポーネントを呼ぶ構成にする。
  - **既存コンポーネントの移植**
    - 現行の `src/components/Map.tsx`, `ShopPopup.tsx`, `Timetable.tsx` などを `src/features/map`, `src/features/timetable` に移植・調整。
    - Leaflet 利用部分は `"use client"` が必要なクライアントコンポーネントとして切り出し。
  - **ルーティング最低限の整備**
    - `/`(暫定トップ)、`/map`、`/timetable` ページを作成し、それぞれ既存機能を紐付ける。

---

## フェーズ2: トップページとナビゲーション (FR-00, FR-10)

- **目的**: 「公式アプリらしい顔」としてのトップメニューと共通レイアウトを整える。
- **タスク**:
  - **トップページ機能ランチャー**
    - `app/page.tsx` にグリッド状のボタン (マップ / 企画一覧 / NePP展示 / About) を配置。
    - それぞれ `/map`, `/events`, `/nepp`, `/about` へのリンクにする。
  - **共通レイアウト**
    - `app/layout.tsx` に公式HPを模したヘッダー・フッターを実装。
    - ナビゲーション項目: 「Top」「マップ」「企画一覧」等の固定リンクにする。

---

## フェーズ3: マップ機能拡張 (FR-01〜04)

- **目的**: 要件定義書に近いマップUXを作る。
- **タスク**:
  - **屋外マップレイヤー整理**
    - Leaflet + OSM + イラスト地図のオーバーレイ構成を Next.js 用に最適化。
    - 中央位置・ズーム・バウンディング調整。
  - **屋内マップと階層ナビ (簡易版)**
    - Lv.1 屋外 / Lv.2 屋内をタブまたはトグルで切り替えられる UI を追加。
    - 当初は 1棟 or 限定エリアのみの屋内マップから着手し、フロア切替タブ (`1F/2F` など) を最低限実装。
  - **ピン表示の拡張**
    - `shops.json` 相当のデータにカテゴリ・種別(模擬店/ステージ/設備/NePPなど)フィールドを追加。
    - Leaflet の `divIcon` やカスタムアイコンでカテゴリごとに見た目を変更。
    - NePP展示ピンだけアニメーションや色強調を行う。
  - **現在地表示の条件付け**
    - 屋外マップ表示時のみ `navigator.geolocation` ボタンと現在地サークルを表示するよう制御。

---

## フェーズ4: 検索・詳細UI (FR-05〜07)

- **目的**: 「探せる・絞れる・詳細が見やすい」インタラクションを作る。
- **タスク**:
  - **Fuse.js 検索導入**
    - クライアントサイドでショップ/企画データを読み込み、名称・説明文に対して Fuse.js を設定。
    - 検索バーコンポーネントを `map` ページ上部に配置し、入力に応じてマッチしたピンを強調 or リスト表示。
  - **カテゴリフィルタ**
    - 「食べ物」「展示」「体験」などのタグボタンを用意し、ON/OFFでマップピンの表示を絞り込み。
  - **詳細ドロワー(Vaul)**
    - ピン or 検索結果をタップしたときに Vaul の bottom sheet を表示。
    - 店名・写真・説明・開催時間などを表示し、マップとの連動(ドロワーオープン時に対象ピンへズームするなど)を検討。

---

## フェーズ5: データ連携とバリデーション (FR-08〜09)

- **目的**: 実行委員会の Google Sheets をソースオブトゥルースにし、データ品質を保証する。
- **タスク**:
  - **スキーマ定義 (Zod)**
    - 企画データ・マップピンデータの型をZodで定義し、必須項目・型・Enumを明文化。
  - **ビルド時データ取得スクリプト**
    - `scripts/fetch-sheets.ts` のようなNodeスクリプトを作成し、Google Sheets APIからデータを取得。
    - 取得データをZodでパースし、NGならエラーを投げてプロセス終了 (ビルド失敗)。
    - OKなら `src/data/generated/*.json` に書き出す。
  - **Next.jsビルドとの統合**
    - `package.json` の `prebuild` などで上記スクリプトを呼び出すよう設定。
    - ページ・feature側ではローカルの `generated` JSON を参照するだけにする。

---

## フェーズ6: UI磨き込み・PWA対応 (FR-11, NFR-03〜04)

- **目的**: 公式アプリとして配布できるクオリティに仕上げる。
- **タスク**:
  - **モバイルファーストデザイン調整**
    - スマホ縦画面での見やすさ・タップしやすさを優先し、PC時は中央にモバイルビューを配置。
    - カラースキームを公式サイト準拠 (マリンブルー基調) に合わせる。
  - **PWA設定**
    - `public/manifest.json` を整備し、名称・ショートネーム・テーマカラー・背景色・アイコン群を登録。
    - Next.js推奨のPWA設定 (必要であればプラグイン) を導入し、インストール可能にする。
    - スプラッシュ画面でNePPロゴアニメーションを表示する簡易実装を追加。

---

## フェーズ7: 品質保証・ドキュメント

- **目的**: メンテナンスしやすい状態で本番運用に乗せる。
- **タスク**:
  - **Lint/Format整備**
    - Biome または ESLint + Prettier を導入し、TypeScript Strict と併せてプロジェクトルールを固める。
    - `pre-commit` or `lint-staged` でコミット前チェックを自動化。
  - **テスト & 動作確認**
    - 主要機能(マップ表示・検索・詳細ドロワー・Sheets連携)について、E2Eテスト or 手順書ベースのチェックリストを用意。
  - **運用手順ドキュメント**
    - 実行委員会向け: Sheetsの入力ルール・デプロイトリガー方法の説明資料。
    - 開発チーム向け: ディレクトリ構成、開発フロー、よくある変更パターンを `docs/` に整理。
