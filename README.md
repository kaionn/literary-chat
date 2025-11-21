# 栞の読書室 (Literary Chat)

文学少女「栞(しおり)」とチャットできるWebアプリケーションです。古書店の片隅で本を読む、黒髪メガネの文学少女というキャラクター設定で、Google Gemini APIを使用して会話を生成します。

## 概要

このアプリケーションは、文学的な視点や哲学的な視点から会話を返してくれるAIチャットボットです。栞は純文学、哲学書、古典を愛し、知的で少し冷ややかな口調で会話します。

### 主な特徴

- 文学少女「栞」とのインタラクティブな会話
- Google Gemini API (gemini-2.5-flash-lite) を使用したAI応答
- React + TypeScript + Viteによるモダンな開発環境
- レスポンシブなUIデザイン
- 会話履歴の保持

## セットアップ

### 前提条件

- Node.js (推奨: v18以上)
- npm または yarn
- Google Gemini API キー

### インストール手順

1. リポジトリをクローン

```bash
git clone <repository-url>
cd literary-chat
```

2. 依存関係をインストール

```bash
npm install
```

3. 環境変数を設定

`.env.example` をコピーして `.env` ファイルを作成し、Gemini API キーを設定します。

```bash
cp .env.example .env
```

`.env` ファイルを編集:

```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

> [!IMPORTANT]
> Google Gemini API キーは [Google AI Studio](https://makersuite.google.com/app/apikey) から取得できます。

4. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリケーションにアクセスできます。

## 使用技術

- **フロントエンド**: React 19.2.0
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.2.4
- **AI API**: Google Gemini API (gemini-2.5-flash-lite)
- **スタイリング**: CSS (Shippori Mincho フォント使用)
- **リンター**: ESLint

## プロジェクト構成

```
literary-chat/
├── src/
│   ├── components/       # Reactコンポーネント
│   │   ├── CharacterArea.tsx  # キャラクター表示エリア
│   │   └── ChatArea.tsx       # チャット表示・入力エリア
│   ├── hooks/           # カスタムフック
│   │   └── useChat.ts   # チャット機能のロジック
│   ├── assets/          # 画像などの静的ファイル
│   ├── App.tsx          # メインアプリケーションコンポーネント
│   ├── App.css          # アプリケーションスタイル
│   ├── index.css        # グローバルスタイル
│   └── main.tsx         # エントリーポイント
├── public/              # 公開静的ファイル
├── .env.example         # 環境変数のサンプル
└── package.json         # プロジェクト設定
```

## スクリプト

```bash
# 開発サーバーを起動
npm run dev

# 本番用ビルド
npm run build

# リンターを実行
npm run lint

# ビルドしたアプリをプレビュー
npm run preview
```

## キャラクター設定

**栞(しおり)** - 古書店の片隅で本を読む文学少女

- 一人称: 「私」
- 口調: 丁寧だが少し冷ややかで知的
- 好きなもの: 純文学、哲学書、古典
- 特徴: 知識豊富で、会話に文学的な引用や比喩を織り交ぜる

## 画像の使用について

> [!CAUTION]
> このリポジトリに含まれる画像ファイル(`src/assets/` および `public/` ディレクトリ内の画像)は、プロジェクト作成者が特定の目的のために使用しているものです。
> 
> **これらの画像を無断で使用、複製、配布、改変することは禁止されています。**
> 
> 画像を使用したい場合は、必ず権利者の許可を得てください。このプロジェクトをフォークまたは利用する際は、独自の画像に差し替えることを強く推奨します。

## ライセンス

このプロジェクトのコードはMITライセンスの下で公開されていますが、画像ファイルは対象外です。詳細は上記「画像の使用について」をご確認ください。

## 開発者向け情報

### ESLint設定の拡張

本番環境向けアプリケーションを開発する場合は、型を考慮したリントルールを有効にすることを推奨します。

詳細は [TypeScript ESLint のドキュメント](https://typescript-eslint.io/getting-started) を参照してください。

### API使用上の注意

- Gemini APIには使用量制限があります
- APIキーは `.env` ファイルで管理し、Gitにコミットしないでください
- `.gitignore` に `.env` が含まれていることを確認してください
