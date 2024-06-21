'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', textAlign: 'center', color: '#000', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        {isLoading && <div>Carregando...</div>}
        {error && <div>{error.message}</div>}
        {user && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <img src={user.picture} alt={user.name} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            </div>
            <h2 style={{ marginBottom: '10px' }}>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
