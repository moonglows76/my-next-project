import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Link from "next/link";
import styles from "./index.module.css";

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
};

export default function Pagination({
  totalCount,
  current = 1,
  basePath = "/news",
}: Props) {
  // ページ数を計算する
  // Array.fromは第一引数の配列の長さ分の配列を生成し、第二引数の関数を各要素に適用する
  // Math.ceilは引数の数値を切り上げて最小の整数を返す (例: 3.1 => 4)
  // 45ページある場合はページ送りの表示は5ページ分になるので 45 / 10 = 4.5 から 5ページ 必要という計算
  // (_, i) => i + 1 はArray.fromの第一引数に指定した配列の各要素に処理を施す関数。
  // この関数の第一引数 _ はArray.fromの第一引数の配列の要素を指すが、
  // ここでは使わないので _ で無視している。使う場合は _ の代わりに任意の変数名を指定する
  // 第二引数 i はインデックス番号を指す
  // この関数はインデックス番号に1を足しているので、ページ番号は1から始まる
  const pages = Array.from(
    { length: Math.ceil(totalCount / NEWS_LIST_LIMIT) },
    (_, i) => i + 1
  );

  return (
    <nav>
      <ul className={styles.container}>
        {pages.map((p) => (
          <li className={styles.list} key={p}>
            {current !== p ? (
              <Link href={`${basePath}/p/${p}`} className={styles.item}>
                {p}
              </Link>
            ) : (
              <span className={`${styles.item} ${styles.current}`}>
                {p}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}