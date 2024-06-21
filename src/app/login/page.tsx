import React from 'react';
import { Button } from "@/components/ui/button";
import '../globals.css'; // Importe o arquivo global.css

// /app/subpage/page.tsx
export default function Subpage() {
  return (
    <div className="overlay">
      <Button style={{ padding: '66px 72px', fontSize: '2.85rem' }}>
        <a href="/api/auth/login">Login</a>
      </Button>
    </div>
  );
}


// // import React from 'react';
// // import { Button } from "@/components/ui/button";
// // import '../globals.css'; // Importe o arquivo global.css


// // // /app/subpage/page.tsx
// // export default function Subpage() {
// //   return <div className="centered-container">
// //   <Button>
// //     <a href="/api/auth/login">Login</a>
// //   </Button>
// // </div>;
// // }

// "use client";
// // pages/login.tsx
// import React from 'react';
// import NoLayout from '@/components/noLayout';

// const Login: React.FC = () => {
//   return (
//     <div>
//       <h1>Login Page</h1>
//       {/* Formulário de login aqui */}
//     </div>
//   );
// };

// Login.getLayout = (page: React.ReactNode): React.ReactNode => {
//   return <NoLayout>{page}</NoLayout>;
// };

// export default Login;



// const Page = () => {
//   return (
//       <div className="centered-container">
//         <Button>
//           <a href="/api/auth/login">Login</a>
//         </Button>
//       </div>
//   );
// }

// export default Page;


// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password })
//     });

//     if (response.ok) {
//       router.push('/');
//     } else {
//       const data = await response.json();
//       setError(data.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl">Login</CardTitle>
//           <CardDescription>Introduz os Dados para efetuar o Login</CardDescription>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           {error && <div className="text-red-500">{error}</div>}
//           <div className="grid gap-2">
//             <Label htmlFor="username">Username</Label>
//             <Input
//               id="username"
//               type="text"
//               placeholder="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full" onClick={handleLogin}>
//             Login
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default Login;
