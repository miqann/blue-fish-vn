import { cva, VariantProps } from "class-variance-authority";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { RenderHeader } from "./RenderHeader";
import Image from "next/image";
import Link from "next/link";
import { Route } from "../../../public/shared/constant/route";

const headerDesktopHeight = 5.6;

const headerVariant = cva(
  "fixed top-0 z-[5] w-full p-[3rem] bg-white border-b-[1px] border-solid border-[white]",
  {
    variants: {
      background: {
        transparent: " [--header-bg-md:transparent]",
        white: "[--header-bg-md:#ffffff]",
      },
    },
  }
);

interface HeaderProps {
  topHeaderBg?: VariantProps<typeof headerVariant>["background"];
  searchGear: React.ReactNode;
  cartButton?: React.ReactNode;
  className?: string;
  navList?: React.ReactNode;
}

export function StickyHeader({
  topHeaderBg,
  searchGear,
  cartButton,
  className,
  navList,
}: HeaderProps) {
  const [bg, setBg] = useState(topHeaderBg);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (topHeaderBg !== "transparent") {
      return;
    }
    if (latest > headerDesktopHeight && bg !== "white") {
      setBg("white");
    }
    if (latest <= headerDesktopHeight && bg !== "transparent") {
      setBg("transparent");
    }
  });

  const logo = (
    <Link href={Route.home}>
      <Image
        src={"/static/icon/bluefins-icon.png"}
        className="min-w-[65px] cursor-pointer"
        alt="Bluefinsvn"
        width={200}
        height={40}
      />
    </Link>
  );

  return (
    <header className={cn(headerVariant({ background: bg }))}>
      <div className={`flex w-full items-center ${className}`}>
        <RenderHeader
          desktop={
            <>
              {logo}
              {navList}
              {searchGear}
              {cartButton}
            </>
          }
        />
      </div>
    </header>
  );
}
