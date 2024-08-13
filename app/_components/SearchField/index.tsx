"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.css";

export default function SearchField() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // デフォルトの挙動はキャンセル
    e.preventDefault();

    // input要素の取得
    const q = e.currentTarget.elements.namedItem('q');

    // 取得した要素がHTMLInputElement型であることを確認
    if (q instanceof HTMLInputElement) {
      // URLSearchParamsオブジェクトのインスタンスを生成（URLの編集を楽にする）
      // https://qiita.com/ovrmrw/items/1c1564481c4ca9cc4351
      const params = new URLSearchParams();
      // キーと値を追加 「http://example.com/news/search?q=キーワード」 となる
      params.set('q', q.value.trim());
      // ページ遷移する
      router.push(`/news/search?${params.toString()}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.search}>
        <Image src="/search.svg" alt="検索" width={16} height={16} loading="eager" />
        {/*
          defaultValue はJavaScriptのプロパティ。JSXだから属性のように使うことができている。
          これはページ遷移後に検索キーワードを表示しておくための処理。
         */}
        <input
          type="text"
          name="q"
          defaultValue={searchParams.get('q') ?? undefined}
          placeholder="キーワードを入力"
          className={styles.searchInput}
        />
      </label>
    </form>
  );
}