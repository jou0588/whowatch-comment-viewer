# Vercel デプロイガイド

## 🚀 簡単デプロイ手順

### ステップ1: Vercelアカウントの作成

1. [Vercel.com](https://vercel.com) にアクセス
2. GitHubアカウントでサインアップ（無料）

### ステップ2: プロジェクトのアップロード

#### 方法A: GitHub経由（推奨）

1. GitHubに新しいリポジトリを作成
2. このフォルダの内容をプッシュ:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/whowatch-viewer.git
git push -u origin main
```

3. Vercelで「New Project」→「Import Git Repository」
4. リポジトリを選択して「Import」
5. 設定はそのままで「Deploy」をクリック
6. 完了！URLが生成されます

#### 方法B: Vercel CLI（コマンドライン）

```bash
# 1. Vercel CLIをインストール
npm install -g vercel

# 2. プロジェクトディレクトリで実行
cd whowatch-vercel

# 3. ログイン
vercel login

# 4. デプロイ
vercel --prod
```

### ステップ3: URLにアクセス

デプロイが完了すると、以下のようなURLが生成されます:
```
https://whowatch-comment-viewer-xxx.vercel.app
```

このURLをブラウザで開くとすぐに使えます！

## 🔄 更新方法

### GitHub連携の場合
```bash
# コードを修正後
git add .
git commit -m "Update"
git push

# 自動的に再デプロイされます
```

### Vercel CLI の場合
```bash
# コードを修正後
vercel --prod
```

## ⚙️ カスタムドメインの設定

1. Vercelダッシュボードでプロジェクトを開く
2. "Settings" → "Domains"
3. カスタムドメインを追加
4. DNSレコードを設定

## 📊 アクセス統計

Vercelダッシュボードで確認できます:
- アクセス数
- レスポンス時間
- エラーログ

## 💰 料金

- **Hobby プラン（無料）**:
  - 月間100GB帯域幅
  - 100GB/month Function実行時間
  - カスタムドメイン対応
  - HTTPS自動対応

このアプリは無料プランで十分動作します！

## 🐛 トラブルシューティング

### デプロイが失敗する

**原因**: `node-fetch`がインストールされていない

**解決策**:
```bash
npm install
git add package-lock.json
git commit -m "Add package-lock"
git push
```

### APIが動作しない

**確認事項**:
1. `vercel.json` が正しく配置されているか
2. `api/lives.js` が存在するか
3. Vercelダッシュボードでログを確認

### 404エラーが出る

**解決策**:
`vercel.json` の `routes` 設定を確認:
```json
{
  "routes": [
    {
      "src": "/api/lives",
      "dest": "/api/lives.js"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

## 📞 サポート

問題が解決しない場合:
1. [Vercel ドキュメント](https://vercel.com/docs)を確認
2. [Vercel Community](https://github.com/vercel/vercel/discussions)で質問
3. GitHubでIssueを作成

## 🎯 次のステップ

- [ ] カスタムドメインを設定
- [ ] アナリティクスを確認
- [ ] OGPタグを追加（SNSシェア用）
- [ ] PWA対応
- [ ] ダークモード追加

---

**デプロイ完了したら、URLを共有して誰でも使えるようにしましょう！** 🎉