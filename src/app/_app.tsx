// pages/_app.tsx
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import RootLayout from './layout';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <RootLayout>{page}</RootLayout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;






// // pages/_app.tsx

// import { Provider as AuthProvider } from 'next-auth/react';
// import { AppProps } from 'next/app';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <AuthProvider session={pageProps.session}>
//       <Component {...pageProps} />
//     </AuthProvider>
//   );
// }

// export default MyApp;
