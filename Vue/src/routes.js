// import PageComponent from './components/PageComponent.vue'

export const routes = [
    // {path: '/page', component: PageComponent, props: true},
    {path: '*', redirect: '/'}, //fallback if no match
]