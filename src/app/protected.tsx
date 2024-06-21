// pages/protected.tsx
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { User } from '@prisma/client';


const ProtectedPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>Access Denied</p>;
  }

  return <div>Welcome {(session.user as User)?.username}</div>;
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProtectedPage;
