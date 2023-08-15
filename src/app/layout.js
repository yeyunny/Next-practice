import Link from "next/link";
import "./globals.css";
import { Controll } from "./Controll";

export const metadata = {
  title: "NEXTJS Practice",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  // 방법1) 0초 동안 cache를 유지 -> {next: {revalidate: 0}} 옵션 추가
  // 방법2) {cache: "no-store"}
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {
    cache: "no-store",
  });
  const topics = await resp.json();

  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB_Main</Link>
        </h1>
        <ol>
          {topics.map((topic) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <Controll />
      </body>
    </html>
  );
}
