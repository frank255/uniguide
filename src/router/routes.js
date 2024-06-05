
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/course-selection', component: () => import('pages/MatchingCourse.vue') },
      { path: '/institutions', component: () => import('pages/InstitutionsPage.vue') },
      { path: '/career', component: () => import('pages/CareerPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
