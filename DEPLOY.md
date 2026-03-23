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

数分後に以下の形式の URL でアクセスできます（ユーザー名・リポジトリ名は各自のものに読み替え）：

`https://nepp-tumsat.github.io/proto_kaiousaiWebApp/`

## ビルドの内容（Next.js）

- `npm run build` は **`output: 'export'`** により静的ファイルを **`out/`** に出力します。
- GitHub Actions では **`NEXT_PUBLIC_BASE_PATH=/<リポジトリ名>`** を付与し、`https://…github.io/<リポジトリ名>/` の**サブパス**でも `/images/` などのパブリックアセットが解決されるようにしています。
- 成果物のアップロード先は **`out/`**（旧 `dist` の名残は廃止済み）。

**ルートドメイン**（`username.github.io` 本体のみ）にデプロイする場合は、ワークフローの `NEXT_PUBLIC_BASE_PATH` を空にするなど、リポジトリに合わせて調整してください。

## トラブルシューティング

### エラー: "Failed to create deployment (status: 404)"
→ GitHub Pagesが有効化されていません。上記の手順1を実行してください。

### デプロイが完了しない
→ Actionsタブでワークフローの実行状況を確認してください。

