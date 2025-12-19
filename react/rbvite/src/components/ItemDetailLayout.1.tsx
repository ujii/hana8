import { useParams } from 'react-router-dom';

export default function ItemDetailLayout() {
  const { cart } = useSession();
  const params = useParams();
  const id = Number(params.id);

  return (
    <>
      <h1 className='text-xl'></h1>
    </>
  );
}
