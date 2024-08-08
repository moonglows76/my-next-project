import Image from "next/image";
import type { News } from "@/app/_lib/microcms";
import Date from "../Date";
import Category from "../Category";
import styles from "./index.module.css";

type Props = {
  data: News;
};

export default function Article({ data }: Props) {
  return (
    <main>
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.description}>{data.description}</p>
      <div className={styles.meta}>
        <Category category={data.category} />
        <Date date={data.publishedAt ?? data.createdAt} />
      </div>
      {data.thumbnail && (
        <Image
          src={data.thumbnail.url}
          alt=""
          className={styles.thumbnail}
          width={data.thumbnail.width}
          height={data.thumbnail.height}
        />
      )}
      {/*
        dangerouslySetInnerHTMLは渡したHTMLをそのままHTMLとして表示する機能
        十分気をつけて使ってね、という意味でdangerouslyという名前がついている
      */}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: data.content
        }}
      />
    </main>
  )
}