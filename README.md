# template-fullorder

フルオーダーHP制作用テンプレート。ページ構成がない状態で提供され、構成案に基づいてClaude Codeが完全にカスタム実装します。

## 特徴

- **ページなし**: TOPページのプレースホルダーのみ
- **ナビゲーション動的**: `site.json` の `navigation` から読み込み
- **Header/Footer**: 基本構造のみ（ナビゲーションは空）
- **完全カスタム**: 構成案に基づいて自由に実装
- **SEO対応**: JSON-LD構造化データ、OGP、Twitter Card対応
- **API Route**: コンタクトフォーム用APIエンドポイント

## 技術スタック

- Next.js 16.x (App Router)
- React 19.x
- TypeScript 5.x
- Tailwind CSS 4.x

## ファイル構成

```
template-fullorder/
├── data/
│   └── site.json          # 企業情報 + ナビゲーション
├── public/
│   └── images/
│       ├── logo.png       # ロゴ（横長）
│       ├── logo-square.png # ロゴ（正方形）
│       └── logo-only.png  # ロゴマークのみ
├── src/
│   ├── app/
│   │   ├── layout.tsx     # 共通レイアウト（SEO設定含む）
│   │   ├── page.tsx       # TOPページ（プレースホルダー）
│   │   ├── globals.css    # グローバルスタイル
│   │   ├── icon.png       # ファビコン
│   │   ├── apple-icon.tsx # Apple Touch Icon（動的生成）
│   │   ├── opengraph-image.tsx # OGP画像（動的生成）
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts # お問い合わせAPI
│   ├── components/
│   │   ├── Header.tsx     # ヘッダー（navigation.main から読み込み）
│   │   └── Footer.tsx     # フッター（navigation.footer から読み込み）
│   └── lib/
│       └── site.ts        # site.json 読み込みユーティリティ
└── public/images/         # 画像素材
```

## セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

## 使い方

### 1. site.json を設定

```json
{
  "navigation": {
    "main": [
      { "label": "会社概要", "href": "/about" },
      { "label": "サービス", "href": "/service" }
    ],
    "footer": [
      { "label": "会社概要", "href": "/about" },
      { "label": "プライバシーポリシー", "href": "/privacy" }
    ],
    "cta": {
      "label": "お問い合わせ",
      "href": "/contact"
    }
  },
  "company": {
    "name": "株式会社サンプル",
    "catchphrase": "キャッチコピー"
  },
  "seo": {
    "siteUrl": "https://example.com",
    "defaultTitle": "株式会社サンプル",
    "defaultDescription": "サイトの説明文"
  }
}
```

### 2. ページを作成

構成案に基づいて、必要なページを `src/app/` 以下に作成してください。

```
src/app/
├── about/page.tsx      # 会社概要
├── service/page.tsx    # サービス
├── contact/page.tsx    # お問い合わせ
└── privacy/page.tsx    # プライバシーポリシー
```

### 3. コンポーネントを実装

各ページのセクションを `src/components/` にコンポーネント化して実装します。

## コーディングルール

### ブランドカラーの変更

`globals.css` の `@theme` ブロック内のみ変更してください：

```css
@theme {
  --color-navy: #1a365d;        /* メインカラー */
  --color-navy-dark: #0d1b2a;   /* メインカラー（濃） */
  --color-accent: #f97316;      /* アクセントカラー */
  --color-accent-dark: #ea580c; /* アクセントカラー（濃） */
}
```

**注意**: 変数名は変更しないでください（ユーティリティクラスが参照しています）。

### スタイリング

- Tailwind CSS のユーティリティクラスを使用
- カスタムCSSは最小限に
- レスポンシブ対応は `md:` `lg:` プレフィックスを使用

## SEO対応

### 自動生成される項目

| 項目 | ファイル | 備考 |
|------|----------|------|
| OGP画像 | `opengraph-image.tsx` | ロゴから自動生成 |
| Apple Touch Icon | `apple-icon.tsx` | logo-square.pngから生成 |
| ファビコン | `icon.png` | 手動で配置 |
| JSON-LD | `layout.tsx` | LocalBusiness構造化データ |

### site.json で設定する項目

```json
{
  "seo": {
    "siteUrl": "https://example.com",
    "titleSuffix": " | 株式会社サンプル",
    "defaultTitle": "株式会社サンプル",
    "defaultDescription": "サイトの説明文"
  }
}
```

## 画像準備チェックリスト

| 画像 | サイズ | 形式 | 配置場所 | 必須 |
|------|--------|------|----------|------|
| ロゴ（横長） | 任意 | PNG | `public/images/logo.png` | ✅ |
| ロゴ（正方形） | 任意 | PNG | `public/images/logo-square.png` | ✅ |
| ファビコン | 32x32以上 | PNG | `src/app/icon.png` | ✅ |

※ OGP画像・Apple Touch Iconはロゴから自動生成されます。

## API Route

### お問い合わせフォーム

```
POST /api/contact
```

**リクエストボディ**:
```json
{
  "name": "山田太郎",
  "email": "yamada@example.com",
  "phone": "03-1234-5678",
  "company": "株式会社サンプル",
  "message": "お問い合わせ内容"
}
```

**レスポンス**:
```json
{
  "success": true,
  "message": "お問い合わせを受け付けました。"
}
```

## template-standard との違い

| 項目 | template-standard | template-fullorder |
|------|-------------------|-------------------|
| ページ構成 | 7ページ固定 | なし（自由に作成） |
| ナビゲーション | ハードコード | site.json から動的読み込み |
| 用途 | 標準的な企業HP | 完全カスタムHP |

## ライセンス

Private - Sing, Inc.
