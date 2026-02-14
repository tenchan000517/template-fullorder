'use client';

import { company } from "@/lib/site";
import { FadeInUp, HeroBackground } from "@/components/animations";

/**
 * フルオーダーテンプレート - TOPページ
 *
 * このテンプレートはページ構成が空の状態で提供されます。
 * 構成案に基づいて、Claude Codeがセクションを実装してください。
 *
 * 実装手順:
 * 1. doc/wireframe/01_top.md を確認
 * 2. 各セクションをコンポーネント化して実装
 * 3. site.json からデータを読み込む場合は @/lib/site を使用
 *
 * アニメーション使用例:
 * - FadeInUp: スクロール連動フェードイン
 * - FadeInImage: 方向別スライドイン画像
 * - StaggerContainer: 子要素を順次アニメーション（直接の子要素が対象）
 * - HeroBackground: ヒーロー背景フェードイン
 */

export default function Home() {
  return (
    <main>
      {/* ファーストビュー */}
      <HeroBackground className="relative h-screen flex items-center justify-center bg-navy text-white">
        <div className="text-center">
          <FadeInUp>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {company.name || "会社名"}
            </h1>
          </FadeInUp>
          <FadeInUp delay={200}>
            <p className="text-lg md:text-xl text-white/80">
              {company.catchphrase || "キャッチコピーを入力"}
            </p>
          </FadeInUp>
        </div>
      </HeroBackground>

      {/*
        以下、構成案に基づいてセクションを追加してください。

        アニメーション適用例:

        <section className="py-20">
          <FadeInUp>
            <h2>セクションタイトル</h2>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-3 gap-8">
            <Card />
            <Card />
            <Card />
          </StaggerContainer>
        </section>

        <FadeInImage
          src="/images/photo.jpg"
          alt="写真"
          width={800}
          height={600}
          direction="left"
        />
      */}
    </main>
  );
}
