export default async function Read(props) {
  // 수정 후에도 본문에는 수정 사항이 반영되지 않는다면 cache 옵션을 추가!
  const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`, {
    cache: "no-store",
  });
  const topic = await resp.json();
  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}
