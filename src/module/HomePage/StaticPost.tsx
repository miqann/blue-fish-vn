import PostCard, { PostCardProps } from "@/components/ui/Card/PostCard";
import { motion } from "framer-motion";
import { Route } from "../../../public/shared/constant/route";

const listPost: PostCardProps[] = [
  {
    img: "/static/image/post01.jpeg",
    title: "freediving",
    width: 500,
    href: Route.freediving,
  },
  {
    img: "/static/image/post02.jpeg",
    title: "scuba",
    width: 500,
    href: Route.scuba,
  },
  {
    img: "/static/image/post03.jpeg",
    title: "accessories",
    width: 500,
    href: Route.accessories,
  },
  {
    img: "/static/image/post04.jpeg",
    title: "rental",
    width: 500,
    href: Route.rental,
  },
];

export default function StaticPost() {
  return (
    <div className="mx-auto mb-[5rem] w-full max-w-[180rem] mt-[15rem]">
      <div className="flex flex-row gap-10 items-center justify-center">
        {listPost.map(({ img, title, description, ...postProps }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            style={{
              width: 330,
              height: 600,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 16,
              position: "relative",
              cursor: "pointer",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <PostCard
              key={index}
              img={img}
              title={title}
              alt="image"
              {...(description && { description })}
              {...postProps}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
