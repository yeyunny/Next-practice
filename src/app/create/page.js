// 서버컴포넌트를 클라이언트 컴포넌트로 수정!
"use client";
//next13에서는 useRouter를 사용하기 위해서 navigation에서 가져와야 함!
import { useRouter } from "next/navigation";

export default function Create() {
  // fetch 함수에서 lastid를 받아서 새로 생성된(가장 마지막) id의 글로 리디렉션
  const router = useRouter();

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
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        // server랑 통신하는 코드
        fetch(process.env.NEXT_PUBLIC_API_URL + `topics`, options)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;
            router.refresh();
            //새로 생성된(가장 마지막) id의 글로 리디렉션
            router.push(`/read/${lastid}`);
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
