export default [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/login', component: './User/Login' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin'],
    routes: [
      { path: '/', redirect: '/dashboard' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        authority: 'admin',
        component: './Driver/Driver',
      },
      {
        path: '/publications',
        name: 'publications',
        icon: 'book',
        routes: [
          {
            path: '/publications/add',
            name: 'add',
            component: './Publication/AdvancedForm',
          },
          {
            path: '/publications/edit/:id',
            name: 'edit',
            hideInMenu: true,
            component: './Publication/AdvancedForm',
          },
          {
            path: '/publications/list',
            name: 'list',
            component: './Publication/List',
          },
        ],
      },
      {
        path: '/exception',
        name: 'exception',
        hideChildrenInMenu: true,
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: 'not-allowed',
            hideInMenu: true,
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-found',
            hideInMenu: true,
            component: './Exception/404'
          },
          {
            path: '/exception/500',
            name: 'server-error',
            hideInMenu: true,
            component: './Exception/500',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
