import Link from "next/link";

interface NavListProps {
  items: { label: string; href: string }[];
  className?: string;
}

export default function NavList({ items, className }: NavListProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-[10rem]">
      {items.map((item, index) => (
        <Link href={item.href} key={index}>
          <p className={className}>{item.label}</p>
        </Link>
      ))}
    </div>
  );
}
