# GitHub Pagesデプロイ手順

## 1. GitHub Pagesの有効化

1. GitHubリポジトリにアクセス: https://github.com/nepp-tumsat/proto_kaiousaiWebApp
2. **Settings** タブをクリック
3. 左サイドバーの **Pages** をクリック
4. **Source** セクションで **GitHub Actions** を選択
5. 設定を保存

## 2. デプロイの確認

設定後、以下のいずれかでデプロイが開始されます：

- **自動**: `main`ブランチにプッシュすると自動的にデプロイされます
- **手動**: Actionsタブ → "Deploy to GitHub Pages" → "Run workflow" をクリック

## 3. デプロイ完了後

数分後に以下のURLでアクセスできます：
**https://nepp-tumsat.github.io/proto_kaiousaiWebApp/**

## トラブルシューティング

### エラー: "Failed to create deployment (status: 404)"
→ GitHub Pagesが有効化されていません。上記の手順1を実行してください。

### デプロイが完了しない
→ Actionsタブでワークフローの実行状況を確認してください。

