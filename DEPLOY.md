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

### Actions が動かない／一覧にワークフローが出ない

1. **`.github/workflows/deploy.yml` がリモートに乗っているか**  
   `main`（またはデフォルトブランチ）にマージ・プッシュされているか確認する。

2. **デフォルトブランチ名**  
   このワークフローは **`main` と `master` への push** で動く。別名（例: `develop` だけ）にしか push していない場合は動かない。

3. **リポジトリの Actions が有効か**  
   **Settings → Actions → General** で「Allow all actions」など、Actions が無効になっていないか確認する。

4. **手動実行**  
   **Actions** タブ → 「Deploy to GitHub Pages」→ **Run workflow** で手動起動できる（`workflow_dispatch` 付き）。

5. **フォーク**  
   フォーク先では、初回にワークフローの承認が必要な場合がある。

### エラー: "Failed to create deployment (status: 404)"
→ GitHub Pagesが有効化されていません。上記の手順1を実行してください。

### デプロイが完了しない
→ Actionsタブでワークフローの実行状況を確認してください。

### ホーム画面に追加したアプリ（PWA）が起動しない／トップのメニューで 404 になる

- **`manifest.json`** の `start_url` は **リポジトリ名を固定しない**よう、`./`（マニフェストからの相対）にしています。古い **`proto_kaiousaiWebApp` 固定**だと、リポジトリ名が違うと起動 URL がずれます。
- **NePP / About** は [`src/app/nepp/page.tsx`](src/app/nepp/page.tsx) と [`src/app/about/page.tsx`](src/app/about/page.tsx) を追加済みです（以前はルートがなく 404 になっていました）。
- **アイコン**は `public/icons/` に配置しています（キャンパスマップから縮小した仮画像。本番前に差し替え可）。

