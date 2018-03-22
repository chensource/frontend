import Vue from "vue";
import Router from "vue-router";
const _import = require("./_import_" + process.env.NODE_ENV);
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: "/login",
    component: _import("login/index"),
    hidden: true
  },
  {
    path: "/authredirect",
    component: _import("login/authredirect"),
    hidden: true
  },
  {
    path: "/404",
    component: _import("errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: _import("errorPage/401"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: _import("dashboard/index"),
        name: "dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
          noCache: true
        }
      }
    ]
  },
  {
    path: "/documentation",
    component: Layout,
    redirect: "/documentation/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: _import("documentation/index"),
        name: "documentation",
        meta: {
          title: "documentation",
          icon: "documentation",
          noCache: true
        }
      }
    ]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
export const asyncRouterMap = [
  {
    path: "/callrecord",
    component: Layout,
    redirect: "/callrecord/list",
    name: "callrecord",
    meta: {
      title: "callrecord",
      icon: "tell"
    },
    children: [
      {
        path: "/contract/list",
        component: _import("contract/table/index"),
        redirect: "/callrecord",
        children: [
          {
            path: "callrecord-list",
            component: _import("callrecord/list"),
            name: "callrecord-list",
            meta: {
              title: "callrecordlist",
              icon: "table"
            }
          }
        ]
      }
    ]
  },
  {
    path: "/newprop",
    component: Layout,
    name: "newprop",
    meta: {
      title: "newprop",
      icon: "home"
    },
    children: [
      {
        path: "/newprop/list",
        component: _import("contract/table/index"),
        redirect: "/newprop",
        children: [
          {
            path: "newprop-list",
            component: _import("newprop/list"),
            name: "newprop-list",
            meta: {
              title: "newproplist",
              icon: "table"
            }
          }
        ]
      },
      {
        path: "newprop-info",
        component: _import("newprop/info"),
        name: "newprop-info",
        meta: {
          title: "newpropinfo",
          icon: "info"
        }
      },
      {
        path: "newprop-price",
        component: _import("newprop/info"),
        name: "newprop-price",
        meta: {
          title: "newpropprice",
          icon: "price"
        }
      }
    ]
  },
  {
    path: "/contract",
    component: Layout,
    redirect: "/contract/table/deal-tabel",
    name: "contract",
    meta: {
      title: "deal",
      icon: "money"
    },
    hidden: true,
    children: [
      {
        path: "/contract/table",
        component: _import("contract/table/index"),
        redirect: "/contract/table/deal-table",
        name: "Table",
        meta: {
          title: "dealTable"
        },
        children: [
          {
            path: "deal-table",
            component: _import("contract/table/dealTable"),
            name: "dealTable",
            meta: {
              title: "deallist"
            }
          }
        ]
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'form',
  //   meta: {
  //     title: 'form',
  //     icon: 'form'
  //   },
  //   children: [
  //     { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
  //     { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
  //   ]
  // },

  {
    path: "/error",
    component: Layout,
    redirect: "noredirect",
    name: "errorPages",
    meta: {
      title: "errorPages",
      icon: "404"
    },
    children: [
      {
        path: "401",
        component: _import("errorPage/401"),
        name: "page401",
        meta: {
          title: "page401",
          noCache: true
        }
      },
      {
        path: "404",
        component: _import("errorPage/404"),
        name: "page404",
        meta: {
          title: "page404",
          noCache: true
        }
      }
    ]
  },

  {
    path: "/error-log",
    component: Layout,
    redirect: "noredirect",
    children: [
      {
        path: "log",
        component: _import("errorLog/index"),
        name: "errorLog",
        meta: {
          title: "errorLog",
          icon: "bug"
        }
      }
    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];
