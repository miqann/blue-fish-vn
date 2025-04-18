import useViewport from "@/hooks/utils/useViewport";
import { useEffect, useState } from "react";

export function RenderHeader({
  mobile,
  desktop,
  deviceHint,
}: {
  deviceHint?: "desktop" | "mobile";
  mobile?: React.ReactNode;
  desktop?: React.ReactNode;
}) {
  if (!deviceHint) {
    return <RenderAtClient mobile={mobile} desktop={desktop} />;
  }

  return deviceHint === "desktop" ? desktop : mobile;
}

function RenderAtClient({
  mobile,
  desktop,
}: {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}) {
  const { isDesktop } = useViewport({ dbTime: 0 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return show ? (isDesktop ? desktop : mobile) : null;
}
