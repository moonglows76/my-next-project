// Basic認証を行うため、middlewareを追加

// 自前でBasic認証を行うのは大変なので下記のパッケージを利用
import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

// このコードにBasic認証に必要なものが詰まっている
// id/pwは.env.localに記載
export const middleware = createNextAuthMiddleware();

// すべてのリクエストにmiddlewareを適用する
export const config = {
  matcher: ["/(.*)"],
}


// import { NextRequest, NextResponse } from "next/server";

// export function middleware (request: NextRequest) {
//   // リクエストURLをコンソールに出力
//   console.log("middleware: " + request.url);

//   // ここで必要に応じてリダイレクトやエラー処理を行う

//   // この記述で通常のサーバーサイド処理に進む
//   return NextResponse.next();
// }

// // マッチャーを追加
// // マッチャーはmiddlewareを実行する条件を指定する
// // config = {} の場合は全てのリクエストにmiddlewareを適用する
// // config = { matcher: "/about/:path*" } の場合は /about/ から始まるリクエストにmiddlewareを適用する
// // config = { matcher: ["/about/:path*", "/dashboard/:path*"] } の場合は /about/ または /dashboard/ から始まるリクエストにmiddlewareを適用する
// export const config = {
//   matcher: "/about/:path*",
// };
