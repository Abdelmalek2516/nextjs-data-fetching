import BooksList from "./Booklist";

type book = {
  id: number;
  title: string;
  author: string;
};

export default async function Page() {
  // Fetch data safely from the API
  const response = await fetch("http://localhost:3000/api/books", {
    // Important in dev to always get fresh data
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const books: book[] = await response.json();

   return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Books List</h1>
      <BooksList initialBooks={books} />
    </main>
  );
}
