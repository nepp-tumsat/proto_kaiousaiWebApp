# 海王祭Webアプリ

東京海洋大学 海王祭のインタラクティブマップとタイムテーブルを提供するPWA（Progressive Web App）です。

## 機能

- **インタラクティブマップ**: Leaflet.jsを使用した学内マップ表示
  - ピンチイン・アウト（拡大縮小）
  - スワイプ（移動）
  - 模擬店のピン表示と詳細ポップアップ
  - 現在地ボタン（デモ用）

- **タイムテーブル**: イベントの時系列表示
  - 時間順のイベントリスト
  - 「開催中 (NOW)」バッジ表示

- **PWA対応**: ホーム画面への追加が可能
  - オフライン対応（Service Worker）
  - アプリアイコンとスプラッシュ画面

## 技術スタック

- React 18 + TypeScript
- Vite
- Leaflet.js / react-leaflet
- Vite PWA Plugin

## 開発

### セットアップ

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## デプロイ

GitHub Pagesに自動デプロイされます。`main`ブランチにプッシュすると、GitHub Actionsが自動的にビルドとデプロイを実行します。

### 手動デプロイ

1. プロジェクトをビルド: `npm run build`
2. `dist`ディレクトリの内容をGitHub Pagesにデプロイ

## 必要な画像ファイル

以下の画像ファイルを配置してください：

- `public/images/campus-map.jpg` - 学内マップ画像
- `public/images/yakisoba.jpg` - 海王焼きそばの画像
- `public/images/nepp_booth.jpg` - NePPブースの画像
- `public/images/stage.jpg` - ステージの画像
- `public/icons/icon-192x192.png` - PWAアイコン（192x192）
- `public/icons/icon-512x512.png` - PWAアイコン（512x512）

## ライセンス

このプロジェクトは提案用プロトタイプ（MVP）です。

