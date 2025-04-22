import Common from "@/components/layout/Common";
import NavList from "@/components/ui/NavList/NavList";
import FreeDiving from "@/module/FreeDiving";
import Head from "next/head";
import { Route } from "../../public/shared/constant/route";
import HeaderCart from "@/components/header/HeaderCart";

const navList = [
  {
    label: "Freediving",
    href: Route.freediving,
  },
  {
    label: "Scuba diving",
    href: Route.scuba,
  },
  {
    label: "Phu kien",
    href: Route.accessories,
  },
  {
    label: "Dich vu thue",
    href: Route.rental,
  },
];

export default function FreeDivingPage() {
  return (
    <>
      <Head>
        <title>FreeDiving</title>
      </Head>
      <Common
        cartButton={<HeaderCart />}
        navList={
          <NavList
            items={navList}
            className="font-medium text-[1.6rem] text-[#005282] hover:font-bold min-w-[140px] w-full text-center"
          />
        }
        className="justify-between px-[6rem] gap-4"
      >
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
