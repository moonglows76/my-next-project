import { getNewsList } from "@/app/_lib/microcms";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import NewsList from "@/app/_components/NewsList";
import SearchField from "@/app/_components/SearchField";

type Props = {
  searchParams: {
    q: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const { contents: news } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    q: searchParams.q,  // クエリパラメータを渡す
  });

  return (
    <>
      <SearchField />
      <NewsList news={news} />
    </>
  );
}
