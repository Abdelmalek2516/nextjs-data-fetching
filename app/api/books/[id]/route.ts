import { NextRequest } from "next/server";
import books from "@/app/api/db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return new Response("Book not found", { status: 404 });
  }

  return Response.json(book);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const updatedBook = await request.json();

  const index = books.findIndex((b) => b.id === Number(id));

  if (index === -1) {
    return new Response("Book not found", { status: 404 });
  }

  books[index] = { ...updatedBook, id: Number(id) };
  return Response.json(books[index]);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const index = books.findIndex((b) => b.id === Number(id));

  if (index === -1) {
    return new Response("Book not found", { status: 404 });
  }

  books.splice(index, 1);
  return new Response(null, { status: 204 });
}
