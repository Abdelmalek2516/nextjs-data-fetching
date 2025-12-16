
"use client";
import  { useEffect , useState } from "react";
import link from "next/link";

interface User {
  id: number;
  name: string;
}

export default function Page(){
  const [users,setUsers] = useState<User[]>([]);
  const [loading,setLoading] = useState (true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) =>{setUsers(data);
       setLoading(false);}
       );
  }, []);
  return (
    <div>
      <h1>Ancienne methode (Client)</h1>
      <Link href="/users-new"><button style={{ padding: "10px 20px", marginBottom: "20px" }}>Aller a la nouvelle page</button></Link>
      

      {loading ?(
        <p style = {{color: "blue",fontWeight: "bold"}}>Loading Users....</p>
      ) : ( 
        users.map((u) => (<p key={u.id}>{u.name}</p>
        ))
      )}
    </div>
  );
}
import { useRouter } from "next/navigation" ;import Link from "next/link";
  