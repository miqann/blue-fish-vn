import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#005282] py-[3.2rem]">
      <div className="m-auto flex w-full max-w-[172rem] flex-row justify-between items-center gap-[3.6rem] px-[10rem]">
        <div className="flex flex-col justify-between gap-[2.2rem] text-[1.6rem] font-medium text-[var(--border)] leading-normal">
          <Image
            src={"/static/icon/bluefins-icon-white.png"}
            className="min-w-[65px] bg-white"
            alt="Bluefishvn"
            width={200}
            height={40}
          />
          <div className="flex flex-col gap-2">
            <p>Công ty TNHH Bluefins</p>
            <p>115/13 Hưng Phú, Phường 8, Quận 8, HCM 0705.89.7788</p>
            <p>bluefins.vn@gmail.com</p>
          </div>
          <p>Copyright belong to BLUEFINS 2024</p>
        </div>
        <div>
          <Image
            src={"/static/image/map.png"}
            alt="map"
            width={345}
            height={210}
          />
        </div>
      </div>
    </footer>
  );
}
