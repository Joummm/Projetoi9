import { getSession } from '@auth0/nextjs-auth0';

export default async function ImgServer() {
  const { user } = await getSession();

  return (
      user && (
          <div>
            <h2>{user.name}</h2>
          </div>
      )
  );
}