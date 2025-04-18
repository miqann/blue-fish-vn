import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export interface PostCardProps {
  img?: string | StaticImageData;
  alt?: string;
  href?: string;
  title: string;
  description?: string;
  linkOnTitle?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export default function PostCard({
  img,
  href,
  title,
  description,
  className,
  alt,
  width = 0,
  height = 0,
}: PostCardProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <Link href={href || "#"}>
        <div className="w-full h-full relative">
          {img && (
            <Image
              className="h-full w-full object-cover"
              src={img}
              alt={alt || `${title}-img`}
              width={width}
              height={height}
            />
          )}
          <div className="absolute inset-0 flex items-end justify-center">
            <h3 className="py-[2.8rem] text-[4rem] font-bold text-white uppercase font-outline-2 font-inter">
              {title}
            </h3>
            {description && (
              <p className="text-[2rem] font-light leading-normal sm:text-[2.4rem]">
                {description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
