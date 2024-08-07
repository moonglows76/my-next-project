// globals.cssはlayout.tsxで読み込んでいて、インスタンスを作らなくても反映される
// className="title"
// page.module.cssはpage.tsxで読み込むときに、インスタンスを作らないと反映されない＆インスタンスはJavaScriptなので{}で囲む
// className={styles.title}
// ページごとのスタイルはxxxx.module.cssで管理するとよい
import styles from "./page.module.css";
import Image from "next/image";

import NewsList from "@/app/_components/NewsList";
import ButtonLink from "@/app/_components/ButtonLink";
import type { News } from "@/app/_lib/microcms";

const data: {
  contents: News[];
} = {
  contents: [
    {
      id: "1",
      title: "渋谷にオフィスを移転しました",
      category: {
        name: "更新情報",
      },
      publishedAt: "2023/05/19",
      createdAt: "2023/05/19",
    },
    {
      id: "2",
      title: "当社CEOが世界リーダーTOP30に選出されました",
      category: {
        name: "更新情報",
      },
      publishedAt: "2023/05/19",
      createdAt: "2023/05/19",
    },
    {
      id: "3",
      title: "テストの記事です",
      category: {
        name: "更新情報",
      },
      publishedAt: "2023/04/19",
      createdAt: "2023/04/19",
    },
  ]
}

const sliceData = data.contents.slice(0, 2);
// const sliceData: News = [];

export default function Home() {
  // JavaScript定数や式などを書くことができる
  const name = "世界";

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
        />
      </section>
      <section className={styles.news}>
        <h2 className={styles.newsTitle}>お知らせ</h2>
        <NewsList news={sliceData} />
        <div className={styles.newsLink}>
          <ButtonLink href="/news">もっとみる</ButtonLink>
        </div>
      </section>
    </>
  );
}
