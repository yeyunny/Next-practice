// 서버컴포넌트를 클라이언트 컴포넌트로 수정!
"use client";
//next13에서는 useRouter를 사용하기 위해서 navigation에서 가져와야 함!
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  //title, body의 값을 가져오기 위해 useState 사용
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // fetch 함수에서 lastid를 받아서 새로 생성된(가장 마지막) id의 글로 리디렉션
  const router = useRouter();
  // params 사용해서 id 가져오기
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `topics/` + id)
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, []);

  return (
    // 사용자와 상호작용할 때 onSubmit이 실행
    // 서버 컴포넌트에서는 onSubmit을 사용하지 않음
    <form
      onSubmit={(e) => {
        e.preventDefault();
        //여기서의 target은 form을 말한다
        // name이 title
        const title = e.target.title.value;
        const body = e.target.body.value;

        // update 통신 코드
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        // server랑 통신하는 코드
        fetch(process.env.NEXT_PUBLIC_API_URL + `topics/` + id, options)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;
            router.refresh();
            //새로 생성된(가장 마지막) id의 글로 리디렉션
            router.push(`/read/${lastid}`);
          });
      }}
      // refresh 이후에도 수정 사항이 본문에 반영되지 않는다면 read 폴더의 page.js에 cache 관련 옵션 넣기!
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
