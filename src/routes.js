import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import SettingView from './components/views/Setting.vue'
import ContentView from './components/views/Content.vue'
import ListSubjectView from './components/views/ListSubject.vue'
import AddSubjectView from './components/views/AddSubject.vue'
import EditSubjectView from './components/views/EditSubject.vue'
import ListArticlesView from './components/views/ListArticles.vue'
import ArticlesView from './components/views/Articles.vue'
import AddArticleView from './components/views/AddArticle.vue'
import EditArticleView from './components/views/EditArticle.vue'
import FeaturesView from './components/views/Features.vue'

// Routes
const routes = [
  {
    path: '/',
    component: LoginView
  },
  {
    path: '/login',
    component: LoginView
  }, {
    path: '/in',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Résumé des contenus et activités'}
      }, {
        path: 'features',
        alias: '',
        component: FeaturesView,
        name: 'Caractéristiques',
        meta: {description: 'Les caractéristiques de la planète Mars'}
      }, {
        path: 'subject',
        component: ContentView,
        children: [
          {
            path: 'list',
            alias: '',
            component: ListSubjectView,
            name: 'Contenus',
            meta: {description: 'Gestion des chapitres'}
          }, {
            path: 'add',
            component: AddSubjectView,
            name: 'Nouveau chapitre',
            meta: {description: 'Ajout de chapitre'}
          }, {
            path: 'edit/:id',
            component: EditSubjectView,
            props: true,
            name: 'Modifier chapitre',
            meta: {description: 'Editer un chapitre'}
          }
        ]
      }, {
        path: 'article/:id',
        component: ArticlesView,
        props: true,
        children: [
          {
            path: 'list',
            alias: '',
            component: ListArticlesView,
            name: 'Articles',
            meta: {description: 'Gestion des articles'}
          }, {
            path: 'add/:id',
            component: AddArticleView,
            name: 'Nouvel article',
            props: true,
            meta: {description: 'Ajout d\'article'}
          }, {
            path: 'edit/:id',
            component: EditArticleView,
            props: true,
            name: 'Modifier article',
            meta: {description: 'Editer un artcile'}
          }
        ]
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Réglages',
        meta: {description: 'Page pour modifier les informations de profil'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
