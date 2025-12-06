# アーキテクチャ

## プロジェクト構造

```
proto_kaiousaiWebApp/
├── public/                 # 静的ファイル
│   ├── images/            # 画像ファイル
│   ├── icons/             # PWAアイコン
│   └── manifest.json      # PWAマニフェスト
├── src/
│   ├── components/        # Reactコンポーネント
│   │   ├── Map.tsx        # インタラクティブマップ
│   │   ├── Timetable.tsx  # タイムテーブル
│   │   └── ShopPopup.tsx  # 店舗詳細モーダル
│   ├── data/              # データファイル
│   │   ├── shops.json     # 模擬店データ
│   │   └── events.json    # イベントデータ
│   ├── styles/            # スタイルファイル
│   ├── App.tsx            # メインアプリコンポーネント
│   └── main.tsx           # エントリーポイント
├── .github/
│   └── workflows/         # GitHub Actions
└── docs/                  # ドキュメント
```

## コンポーネント構成

### App.tsx
- アプリケーションのルートコンポーネント
- タブナビゲーション（マップ/タイムテーブル）
- 状態管理（アクティブタブ）

### Map.tsx
- Leaflet.jsを使用したマップ表示
- カスタムマップ画像のオーバーレイ
- マーカーの表示とクリックイベント
- 現在地ボタン（デモ用）

### Timetable.tsx
- イベントリストの表示
- 「開催中」バッジの表示
- 時間順のソート

### ShopPopup.tsx
- 店舗詳細情報のモーダル表示
- 画像と説明文の表示

## データフロー

```
JSONファイル (shops.json, events.json)
    ↓
Reactコンポーネント (useState)
    ↓
UI表示
```

## 状態管理

- **ローカル状態**: Reactの`useState`フックを使用
- **グローバル状態**: なし（プロトタイプのため最小限）

## スタイリング戦略

- **コンポーネント単位のCSS**
  - 各コンポーネントに専用のCSSファイル
  - スコープ化されたスタイル

- **グローバルスタイル**
  - `globals.css`で基本リセットと共通スタイル

- **CSS変数**
  - テーマカラー（マリンブルー）の一元管理

## ビルドプロセス

1. **TypeScriptコンパイル**
   - `tsc`で型チェック

2. **Viteビルド**
   - バンドルと最適化
   - アセットの処理

3. **PWA生成**
   - Service Workerの生成
   - マニフェストの生成

## デプロイフロー

```
Git Push
    ↓
GitHub Actions (自動トリガー)
    ↓
ビルド (npm run build)
    ↓
アーティファクトのアップロード
    ↓
GitHub Pagesへのデプロイ
```

## パフォーマンス考慮事項

- **コード分割**: Viteによる自動分割
- **画像最適化**: 遅延読み込み
- **キャッシュ**: Service Workerによるオフライン対応
- **バンドルサイズ**: 最小限の依存関係

