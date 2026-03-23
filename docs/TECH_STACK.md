# 使用技術スタック

## 概要

海王祭Webアプリは、モダンなWeb技術を使用して構築されたPWA（Progressive Web App）です。

## フロントエンド

### コア技術

- **React 18.2.0**
  - UI構築のためのライブラリ
  - コンポーネントベースのアーキテクチャ

- **TypeScript 5.2.2**
  - 型安全性を提供
  - 開発時のエラー検出を強化

- **Next.js 14（App Router）**
  - ルーティングと静的エクスポート（`output: 'export'`）
  - 開発サーバーと本番ビルド

### UIライブラリ

- **Leaflet 1.9.4**
  - インタラクティブマップの表示
  - モバイル対応のタッチ操作

- **react-leaflet 4.2.1**
  - React用のLeafletラッパー
  - Reactコンポーネントとしてマップを実装

### スタイリング

- **グローバルCSS + feature 単位のCSS**
  - [`src/styles/`](../src/styles/) と [`src/features/`](../src/features/) 配下のスタイル

- **カスタムCSS変数**
  - マリンブルー (#003366) を基調としたテーマカラー

## PWA機能

- **`public/manifest.json`**
  - Webアプリマニフェスト（名前・アイコン・テーマカラーなど）

## 開発ツール

### ビルド・バンドル

- **Next.js**
  - 本番ビルドとコード分割
  - 静的エクスポート時は `out/` に出力

### リンター・フォーマッター

- **ESLint 8.55.0**
  - コード品質チェック
  - TypeScript対応

- **TypeScript ESLint**
  - TypeScript専用のリンタールール

## デプロイ

- **GitHub Pages**
  - 静的サイトホスティング
  - HTTPS対応

- **GitHub Actions**
  - CI/CDパイプライン
  - 自動ビルド・デプロイ

## データ管理

- **JSONファイル**
  - 生成データの管理（`src/data/generated/`）
  - フロントエンド内でのデータ保持

## パッケージ管理

- **npm**
  - 依存関係の管理
  - パッケージのインストール

## 技術選定の理由

### React + TypeScript
- 型安全性と開発効率のバランス
- モダンな開発体験

### Next.js
- 静的エクスポートで GitHub Pages に適合
- App Router によるページ構成

### Leaflet.js
- 軽量でモバイル対応
- カスタムマップ画像の表示が容易

### PWA
- アプリストア不要でインストール可能
- マニフェストによるホーム画面追加

## バージョン情報

主要な依存関係のバージョン（`package.json` を正とする）：

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.2.2",
  "next": "^14.0.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1"
}
```

## ブラウザ対応

- **モバイルブラウザ（優先）**
  - iOS Safari
  - Android Chrome
  - その他のモダンブラウザ

- **PWA機能**
  - マニフェスト対応ブラウザ
  - ホーム画面追加機能

## パフォーマンス

- **最適化**
  - Next.js によるバンドル最適化
  - 画像の遅延読み込み
