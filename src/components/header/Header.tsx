import { StickyHeader } from "./StickyHeader";

interface HeaderProps {
  topHeaderBg?: "white" | "transparent";
  searchGear: React.ReactNode;
}

export default function Header({
  topHeaderBg = "white",
  searchGear,
}: HeaderProps) {
  return <StickyHeader topHeaderBg={topHeaderBg} searchGear={searchGear} />;
}
