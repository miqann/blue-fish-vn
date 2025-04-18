import Footer from "../footer/Footer";
import Header from "../header/Header";

interface CommonProps {
  children?: React.ReactNode;
  topHeaderBg?: "transparent" | "white";
  searchGear?: React.ReactNode;
}

export default function Common({
  children,
  topHeaderBg,
  searchGear,
}: CommonProps) {
  return (
    <div>
      <Header topHeaderBg={topHeaderBg} searchGear={searchGear} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
