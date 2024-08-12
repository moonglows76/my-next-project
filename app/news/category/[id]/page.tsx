import { getCategoryDetail, getNewsList } from "@/app/_lib/microcms";
import { notFound } from "next/navigation";
import NewsList from "@/app/_components/NewsList";
import Category from "@/app/_components/Category";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  // カテゴリ情報を取得して、なにも取得できなかったら404ページを表示する
  const category = await getCategoryDetail(params.id).catch(notFound)

  // カテゴリ情報があったら、そのカテゴリに紐づくニュース一覧を取得する
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
  });

  return (
    <>
      <p>
        <Category category={category} /> の一覧
      </p>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
