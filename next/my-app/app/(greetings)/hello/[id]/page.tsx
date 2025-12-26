'use client';

import { useParams } from 'next/navigation';

export default function HelloId() {
  const { id } = useParams<{ id: string }>();
  return `Hello id is ${id}`;
}

// 서버 컴포넌트
// type Props = {
//   params: Promise<{ id: number }>;
// };

// export default function HelloId({ params }: Props) {
//   // const { id } = await params;
//   const { id } = use(params);
//   return `Hello id is ${id}`;
// }
