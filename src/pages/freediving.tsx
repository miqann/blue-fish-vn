import Common from "@/components/layout/Common";
import FreeDiving from "@/module/FreeDiving";
import Head from "next/head";

export default function FreeDivingPage() {
  return (
    <>
      <Head>
        <title>FreeDiving</title>
      </Head>
      <Common>
        <FreeDiving />
      </Common>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      pageTitle: "Freediving",
    },
  };
}
