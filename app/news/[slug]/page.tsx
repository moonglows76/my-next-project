import { notFound } from "next/navigation";
import { getNewsDetail } from "@/app/_lib/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
}

// { params }: Props は親ページから渡されるパラメータのオブジェクトの中のparamsプロパティを取り出している
// 省略しないなら props: Props と書き、getNewsDetail関数に渡す引数は props.params.slug と書く
export default async function Page({ params, searchParams }: Props) {

  // 末尾に .catch(notFound) を追加することで、データが取得できなかった場合に404ページを表示する
  // getNewsDetailの第2引数（クエリ）にはdraftKeyを指定する
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(notFound);

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/news">ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}