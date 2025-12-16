import Link from "next/link";
import link from "next/link";
interface USER {
  id: number;
  name: string;
}
export default async function Page() {
  const res = await fetch ("https://jsonplaceholder.typicode.com/users");
  const users: USER[] = await res.json();
  return(
    <div>
      <h1>Nouvelle methode (Server)</h1>
      <Link href="/users-old"><button style={{ padding: "10px 20px", marginBottom: "20px" }}>Aller a l'ancienne page</button></Link>
      {users.map((u) => (
        <p key={u.id}>{u.name}</p>
      ))}
    </div>
  )
}