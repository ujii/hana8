import { type NextRequest, NextResponse } from 'next/server';
import { errorResponse, HttpError } from '@/lib/errors';
import { type Book, books } from '../bookdata';

type Params = {
  params: Promise<{ bookId: string }>;
};

const getBook = async ({ params }: Params, isIndex: boolean = false) => {
  const { bookId } = await params;
  const fn = isIndex ? books.findIndex : books.find;
  const book = fn((book) => book.id === +bookId);

  if (!book) throw new HttpError(`Not found book (id: #${bookId})`, 404);

  return book;
};

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const book = (await getBook({ params })) as Book;
    const { title, writer } = await req.json();
    book.title = title;
    book.writer = writer;

    return NextResponse.json(book);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const bookIdx = (await getBook({ params }, true)) as number;
    console.log('🚀 ~ bookIdx:', bookIdx);

    books.splice(bookIdx, 1);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const book = await getBook({ params });
    return NextResponse.json(book);

    // if (!book) return notFound();
    // 아래 방식은 json이 내려옴. 즉 msg가 출력됨
    // return NextResponse.json(
    //   { message: `Not found #${bookId}`, status: 404 },
    //   { status: 404 }, // 두번째 인자로 줘야 Http 응답이 200 OK가 아니라 404로 나옴
    // );
  } catch (err) {
    return errorResponse(err);
  }
}
