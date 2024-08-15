// /sitemap.xmlに対応するサイトマップを生成する
import { Metadata, MetadataRoute } from "next";
import { getAllNewsCategoryList, getAllNewsList } from "./_lib/microcms";

// 与えられた引数にオリジンの文字列を追加して、URLを生成する関数
const buildURL = (path?: string) => `https://my-next-project-gamma-azure.vercel.app${path ?? ""}`;

// サイトマップを生成する関数
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ニュース一覧とカテゴリー一覧のデータをmicroCMSから取得
  const newsContents = await getAllNewsList();
  const categoryContents = await getAllNewsCategoryList();

  // ニュース一覧とカテゴリー一覧のデータからサイトマップを生成
  // 配列.map((content) => (オブジェクトの中身)) をすることで、配列内の要素を使ったオブジェクトで構成される、新しい配列を生成する
  const newsUrls: MetadataRoute.Sitemap = newsContents.map((content) => ({
    url: buildURL(`/news/${content.id}`),
    lastModified: content.revisedAt,
  }));
  const categoryUrls: MetadataRoute.Sitemap = categoryContents.map((content) => ({
    url: buildURL(`/news/category/${content.id}`),
    lastModified: content.revisedAt,
  }));

  const now = new Date();

  return [
    {
      url: buildURL(),
      lastModified: now,
    },
    {
      url: buildURL("/members"),
      lastModified: now,
    },
    {
      url: buildURL("/contact"),
      lastModified: now,
    },
    {
      url: buildURL("/news"),
      lastModified: now,
    },
    // 配列の中味を展開して配列に入れ込む
    ...newsUrls,
    ...categoryUrls,
  ];
}
