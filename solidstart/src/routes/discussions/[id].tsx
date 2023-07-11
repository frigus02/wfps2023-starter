import {Title, useParams} from "solid-start";

export default function Discussions() {
  const params = useParams();  
  return (
    <main>
      <Title>Discussions with id {params.id}</Title>
      Discussion details (TODO) for id {params.id}
    </main>
  );
}
