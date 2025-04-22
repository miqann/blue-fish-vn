import Head from "next/head";
import Common from "@/components/layout/Common";
import StaticPost from "@/module/HomePage/StaticPost";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bluefinsvn</title>
      </Head>
      <Common topHeaderBg="transparent" className="justify-center">
        <StaticPost />
      </Common>
    </>
  );
}
