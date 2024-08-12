import { notFound } from "next/navigation";
import { getNewsList } from "@/app/_lib/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    current: string;
  };
};

export default async function Page({ params }: Props) {
  // URLから現在のページ番号を取得する
  const current = parseInt(params.current, 10);

  // 現在のページ番号が数値でないか、1未満の場合は404ページを表示する
  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  // ニュース一覧を取得する
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });

  // ニュースが取得できなかった場合は404ページを表示する
  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <Pagination totalCount={totalCount} current={current} />
    </>
  );
}

