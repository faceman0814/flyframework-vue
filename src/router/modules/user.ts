import { $t } from "@/plugins/i18n";

export default {
  path: "/user",
  redirect: "/user/index",
  meta: {
    icon: "ri/information-line",
    // showLink: false,
    title: $t("user.userModule"),
    rank: 8
  },
  children: [
    {
      path: "/user/index",
      name: "user",
      component: () => import("@/views/user/user.vue"),
      meta: {
        title: $t("user.userManager")
      }
    },
    {
      path: "/user/role",
      name: "role",
      component: () => import("@/views/user/role.vue"),
      meta: {
        title: $t("user.roleManager")
      }
    }
  ]
} satisfies RouteConfigsTable;
