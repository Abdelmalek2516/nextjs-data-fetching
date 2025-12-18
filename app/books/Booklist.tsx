"use client"; // MUST be a client component for interactivity
import { useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
};

type Props = {
  initialBooks: Book[];
};

export default function BooksList({ initialBooks }: Props) {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  // DELETE a book
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBooks(books.filter((b) => b.id !== id));
    } else {
      alert("Failed to delete");
    }
  };

  // UPDATE a book (simple example: append " (updated)" to title)
  const handleUpdate = async (book: Book) => {
    const updatedBook = { ...book, title: book.title + " (updated)" };
    const res = await fetch(`/api/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    if (res.ok) {
      const data = await res.json();
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? data : b))
      );
    } else {
      alert("Failed to update");
    }
  };

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <strong>{book.title}</strong> by {book.author}{" "}
          <button onClick={() => handleUpdate(book)}>Update</button>
          <button onClick={() => handleDelete(book.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
