// "use client"をつけるとクライアント側でのみ動作するコンポーネントになる
// つけなければサーバー側で動作する（DOMは使えない）
// useStateはブラウザのメモリに展開するため、"use client"が必要
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import cx from "classnames";
import styles from "./index.module.css";

export default function Menu() {
  // これだとnav要素に依存するし、通信タイミングによっては正常に動作しない
  // const open = () => {
  //   document.querySelector('nav')?.classList.add(styles.open);
  // };

  // useStateを使って状態を管理する
  // isOpenの初期値はfalse
  // setOpenはisOpenの値を変更する関数
  // openはisOpenをtrueに変更する関数
  const [isOpen, setOpen] = useState<boolean>(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <div>
      {/*
        cx(styles.nav, isOpen && styles.open) は
        styles.navは常に適用される
        isOpenがtrueのときだけstyles.openを適用する
        cxはclassnamesパッケージの関数で、複数のクラス名を結合する
      */}
      <nav className={cx(styles.nav, isOpen && styles.open)}>
        <ul className={styles.items}>
          <li>
            <Link href="/news">ニュース</Link>
          </li>
          <li>
            <Link href="/members">メンバー</Link>
          </li>
          <li>
            <Link href="/contact">お問い合わせ</Link>
          </li>
        </ul>
        <button className={cx(styles.button, styles.close)} onClick={close}>
          <Image
            src="/close.svg"
            alt="閉じる"
            width={24}
            height={24}
            priority
          />
        </button>
      </nav>
      <button className={styles.button} onClick={open}>
        <Image src="/menu.svg" alt="メニュー" width={24} height={24} priority />
      </button>
    </div>
  )
}