import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("routes/home.tsx"),
    route("test", "routes/test.tsx"),
    route("delete-all-truth", "routes/delete-truth.tsx"),
  ]),
] satisfies RouteConfig;
