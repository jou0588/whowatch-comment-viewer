# ふわっちコメントビューア - オンライン版 🌐

Vercelにデプロイされたサーバーレス版のふわっちコメントビューア

## 🚀 今すぐ使う

**デプロイ済みURL**: https://your-app.vercel.app

ブラウザでアクセスするだけで、インストール不要で使えます！

## ✨ 特徴

- 🌐 **インストール不要** - ブラウザでアクセスするだけ
- ⚡ **サーバーレス** - Vercel Functions で高速動作
- 💰 **完全無料** - Vercelの無料プランで動作
- 📱 **レスポンシブ** - PC・タブレット・スマホ対応
- 🔒 **セキュア** - HTTPS対応

## 📦 デプロイ方法

### 方法1: Vercel CLIで手動デプロイ

```bash
# 1. Vercel CLIをインストール
npm install -g vercel

# 2. ログイン
vercel login

# 3. デプロイ
vercel --prod
```

### 方法2: GitHubと連携して自動デプロイ

1. GitHubにリポジトリを作成
2. このコードをプッシュ
3. [Vercel](https://vercel.com)にアクセス
4. "Import Project"でGitHubリポジトリを選択
5. 自動的にデプロイされます！

### 方法3: ワンクリックデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_URL)

## 🗂️ プロジェクト構造

```
whowatch-vercel/
├── api/
│   └── lives.js          # Serverless Function (プロキシAPI)
├── public/
│   ├── index.html        # フロントエンド
│   └── app.js            # クライアントJS
├── vercel.json           # Vercel設定
└── package.json          # 依存関係
```

## 🛠️ ローカル開発

```bash
# 依存関係をインストール
npm install

# ローカルサーバーを起動
vercel dev

# ブラウザで開く
# http://localhost:3000
```

## 🔧 カスタマイズ

### ポーリング間隔の変更
`public/app.js`:
```javascript
this.pollDelay = 3000; // ミリ秒
```

### デザインのカスタマイズ
`public/index.html` の `<style>` セクションを編集

## 📊 技術スタック

- **フロントエンド**: HTML5, CSS3, Vanilla JavaScript
- **バックエンド**: Vercel Serverless Functions (Node.js)
- **ホスティング**: Vercel
- **API**: ふわっち公式API

## 🌍 環境変数（不要）

このプロジェクトは環境変数なしで動作します。

## 📝 ライセンス

MIT License

## 🔗 リンク

- [Vercel公式ドキュメント](https://vercel.com/docs)
- [Serverless Functions](https://vercel.com/docs/functions)
- [ふわっち公式](https://whowatch.tv/)

## ⚠️ 注意事項

- ふわっちの利用規約を遵守してください
- APIへの過度なアクセスは避けてください
- 個人利用目的で作成されています

## 🎉 使い方

1. デプロイされたURLにアクセス
2. ふわっちの配信URL（例: https://whowatch.tv/viewer/12345678）を入力
3. 「開始」ボタンをクリック
4. リアルタイムでコメントが表示されます！

楽しいライブ配信体験を！ 🎥💬