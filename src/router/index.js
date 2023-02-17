import Vue from 'vue';
import Router from 'vue-router';
import ProductList from '../pages/ProductList';
import Product from '../pages/Product';
import Cart from '../pages/Cart';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'product-list',
            component: ProductList
        },
        {
            path: '/products/:id',
            name: 'product',
            component: Product,
            props: route => { return { productId: Number.parseInt(route.params.id) } }
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
        }
    ]
});

export default router;