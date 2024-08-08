// microCMSのクライアントをインポート
import { createClient } from "microcms-js-sdk";

// microCMSの型定義をインポート
// MicroCMSQueries: クエリの型定義
// MicroCMSImage: 画像の型定義
// APIがオブジェクト型の場合、MicroCMSContent型を使う
// APIがリスト型の場合、MicroCMSListContent型を使う
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

// メンバーの型定義
export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

// カテゴリの型定義
export type Category = {
  name: string;
} & MicroCMSListContent;

// ニュースの型定義
export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

// 環境変数が設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required.");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required.");
}

// MicroCMS のクライアントを生成する
const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// メンバー一覧を取得する
// 引数にクエリ(queries)を指定することができる。形はMicroCMSQueries型
// getListでmicroCMSと通信する。<member>は取得するデータの型
// async/awaitでgetMembersList関数を非同期処理を同期処理のように扱う
export const getMembersList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Member>({
      endpoint: "members",
      queries,
    });
  // listDataが通信で取得できるまで待って、
  // 取得できたらlistDataを返す
  return listData;
};

// ニュース一覧を取得する
export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<News>({
      endpoint: "news",
      queries,
    });
  return listData;
}

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
  return detailData;
}