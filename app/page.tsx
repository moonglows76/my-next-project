// globals.cssはlayout.tsxで読み込んでいて、インスタンスを作らなくても反映される
// className="title"
// page.module.cssはpage.tsxで読み込むときに、インスタンスを作らないと反映されない＆インスタンスはJavaScriptなので{}で囲む
// className={styles.title}
// ページごとのスタイルはxxxx.module.cssで管理するとよい
import styles from "./page.module.css";
import Image from "next/image";
// Imageコンポーネントのpriorityはプリロードするかどうかを指定する

import { getNewsList } from "@/app/_lib/microcms";
import { TOP_NEWS_LIMIT } from "@/app/_constants";

import NewsList from "@/app/_components/NewsList";
import ButtonLink from "@/app/_components/ButtonLink";

export const revalidate = 60;

export default async function Home() {
  // JavaScript定数や式などを書くことができる
  const name = "世界";

  const data = await getNewsList({
    limit: TOP_NEWS_LIMIT
  });

  // HTMLのようなマークアップを書くことができる
  // JavaScriptを書いたり、参照する際には{}で囲む
  return (
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>テクノロジーの力で{name}を変える</h1>
          <p className={styles.description}>私たちは市場をリードしているグローバルテックカンパニーです。</p>
        </div>
        <Image
          className={styles.bgimg}
          src="/img-mv.jpg"
          alt=""
          width={4000}
          height={1200}
          priority
          sizes="100vw"
        />
      </section>
      <section className={styles.news}>
        <h2 className={styles.newsTitle}>お知らせ</h2>
        <NewsList news={data.contents} />
        <div className={styles.newsLink}>
          <ButtonLink href="/news">もっとみる</ButtonLink>
        </div>
      </section>
    </>
  );
}
