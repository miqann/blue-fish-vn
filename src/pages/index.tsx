import Head from "next/head";
import Common from "@/components/layout/Common";
import StaticPost from "@/module/HomePage/StaticPost";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bluefishvn</title>
      </Head>
      <Common topHeaderBg="transparent">
        <StaticPost />
      </Common>
    </>
  );
}
