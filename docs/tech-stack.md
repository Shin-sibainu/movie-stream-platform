# 技術スタック

## フロントエンド

### フレームワーク

- **推奨**: Next.js（React ベース）
  - 理由: サーバーサイドレンダリング、ルーティング、API Routes が統合されている
  - バージョン: 最新の安定版（推奨: 14.x または 15.x）
- **代替案**:
  - React + React Router（SPA として実装する場合）
  - Remix（Next.js の代替として）

### UI ライブラリ

- **推奨**:
  - Tailwind CSS（スタイリング）
  - shadcn/ui または Radix UI（UI コンポーネント）
- **代替案**:
  - Material-UI (MUI)
  - Chakra UI
  - styled-components

### 状態管理

- **推奨**:
  - React Context API + useReducer（小規模な状態管理）
  - Zustand（軽量な状態管理ライブラリ）
- **代替案**:
  - Redux Toolkit（大規模な状態管理が必要な場合）
  - Jotai / Recoil

### 動画プレイヤー

- **YouTube 埋め込み**:
  - react-youtube または react-player（YouTube 埋め込み用ライブラリ）
  - または、直接 iframe を使用

---

## バックエンド（将来の拡張用）

### API

- **推奨**: Next.js API Routes（Next.js を使用する場合）
- **代替案**:
  - Express.js
  - Fastify
  - tRPC（TypeScript 用）

### データベース

- **推奨**:
  - PostgreSQL（リレーショナルデータベース）
  - Prisma ORM（データベースアクセス）
- **代替案**:
  - MongoDB + Mongoose（NoSQL）
  - Supabase（PostgreSQL + リアルタイム機能）
  - Firebase（Firestore）

---

## データ管理（デモ版）

### データストレージ

- **Phase 1（MVP）**:
  - JSON ファイル（静的データ）
  - または、TypeScript/JavaScript のオブジェクトとして定義
- **Phase 2 以降**:
  - データベースに移行

### データ構造の例

```typescript
// types/course.ts
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  sections: Section[];
}

interface Section {
  id: string;
  name: string;
  videos: Video[];
}

interface Video {
  id: string;
  title: string;
  youtubeVideoId: string;
  description?: string;
}
```

---

## 開発ツール

### パッケージマネージャー

- **推奨**: npm または pnpm
- **代替案**: yarn

### コード品質

- **Linter**: ESLint
- **Formatter**: Prettier
- **型チェック**: TypeScript

### バージョン管理

- Git
- GitHub / GitLab / Bitbucket

---

## デプロイ

### ホスティング

- **推奨**:
  - Vercel（Next.js に最適）
  - Netlify
- **代替案**:
  - AWS Amplify
  - Railway
  - Render

### CI/CD

- GitHub Actions
- Vercel の自動デプロイ（GitHub 連携）

---

## 推奨技術スタック（まとめ）

### MVP 段階

```
- Next.js 14/15
- TypeScript
- Tailwind CSS
- react-player（YouTube埋め込み）
- JSONファイル（データ管理）
- ESLint + Prettier
```

### 将来の拡張時

```
- Next.js 14/15
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth.js（認証）
- Stripe（決済）
```

---

## 技術選定の理由

### Next.js を選ぶ理由

1. **統合性**: フロントエンドと API Routes が統合されている
2. **パフォーマンス**: サーバーサイドレンダリングと静的生成が可能
3. **開発体験**: 優れた開発者体験とホットリロード
4. **デプロイ**: Vercel との統合で簡単にデプロイ可能

### TypeScript を選ぶ理由

1. **型安全性**: バグの早期発見
2. **開発体験**: IDE の補完機能が充実
3. **保守性**: コードの可読性と保守性の向上

### Tailwind CSS を選ぶ理由

1. **開発速度**: ユーティリティファーストで高速開発
2. **カスタマイズ性**: 柔軟なスタイリング
3. **バンドルサイズ**: 使用していないスタイルは自動的に削除

---

## 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)
