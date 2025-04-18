export const Route = {
  home: "/",
  freediving: "/freediving",
  scuba: "/scuba",
  accessories: "/accessories",
  rental: "/rental",
} as const;

export type RouteTypes = (typeof Route)[keyof typeof Route];
