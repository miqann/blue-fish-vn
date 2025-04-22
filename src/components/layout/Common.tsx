import Footer from "../footer/Footer";
import { StickyHeader } from "../header/StickyHeader";

interface CommonProps {
  navList?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  cartButton?: React.ReactNode;
  searchGear?: React.ReactNode;
  topHeaderBg?: "transparent" | "white";
}

export default function Common({
  navList,
  children,
  className,
  cartButton,
  searchGear,
  topHeaderBg,
}: CommonProps) {
  return (
    <div>
      <StickyHeader
        navList={navList}
        className={className}
        cartButton={cartButton}
        searchGear={searchGear}
        topHeaderBg={topHeaderBg}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
