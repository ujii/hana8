import { type NextRequest, NextResponse } from 'next/server';
import { books } from '../bookdata';

type Params = {
  params: Promise<{ bookId: string }>;
};

export async function GET(_req: NextRequest, { params }: Params) {
  const { bookId } = await params;
  const book = books.find((book) => book.id === +bookId);

  //   if (!book) return notFound();
  if (!book)
    // 이 방식은 json이 내려옴. 즉 msg가 출력됨
    return NextResponse.json(
      { message: `Not found #${bookId}`, status: 404 },
      { status: 404 }, // 두번째 인자로 줘야 Http 응답이 200 OK가 아니라 404로 나옴
    );

  return NextResponse.json(book);
}
