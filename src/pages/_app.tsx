import { Global } from "@/components/global";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageProps.pageTitle}</title>
      </Head>
      <Global
        globalData={{
          pageTitle: pageProps?.pageTitle,
          query: pageProps?.query,
        }}
      >
        <Component {...pageProps} />
      </Global>
    </>
  );
}
