interface CommonProps {
  children?: React.ReactNode;
  topHeaderBg?: "transparent" | "white";
  searchGear?: React.ReactNode;
}

export default function Common({ children }: CommonProps) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
