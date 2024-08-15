import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";
import { title } from "process";

export const metadata = {
  title: "ニュース",
}

type Props = {
  children: React.ReactNode;
};

// newsフォルダ配下のページ全てに、
// SSRのキャッシュを無効化する（デフォルトではキャッシュの保持期限が無限になるため）
export const revalidate = 60;

export default function NewsLayout({ children }: Props) {
  return (
    <>
      <Hero title="News" sub="ニュース" />
      <Sheet>{children}</Sheet>
    </>
  );
}