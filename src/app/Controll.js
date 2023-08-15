"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

// 서버 컴포넌트에서 특정 부분만 클라이언트 컴포넌트로 사용하는 방법
export function Controll() {
  const params = useParams();
  const id = params.id;

  return (
    <ul>
      <li>
        <Link href="/create">CREATE</Link>
      </li>
      {/* useParams로 받아올 때, id가 있으면 update, delete 버튼 구현 */}
      {id ? (
        <>
          <li>
            <Link href={"/update/" + id}>UPDATE</Link>
          </li>
          <li>
            <input type="button" value="delete" />
          </li>
        </>
      ) : null}
    </ul>
  );
}
