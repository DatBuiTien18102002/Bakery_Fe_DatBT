import config from '@/config';
import { HomePage, ContactPage, AboutUsPage, ProductPage, ProductDetailPage, CartPage, OrderPage, MyOrdersPage } from '@/pages';
import ProfileForm from '@/forms/ProfileForm/ProfileForm';
import { NoCartIconLayout, DefaultLayout, NoBreadcrumbLayout } from '@/layouts';

const publicRouters = [
    { path: config.routes.home, page: HomePage, layout: NoBreadcrumbLayout, title: config.titles.home },
    { path: config.routes.contact, page: ContactPage, layout: DefaultLayout, title: config.titles.contact },
    { path: config.routes.aboutUs, page: AboutUsPage, layout: DefaultLayout, title: config.titles.aboutUs },
    { path: config.routes.product, page: ProductPage, layout: DefaultLayout, title: config.titles.product },
    { path: `${config.routes.product}/:id`, page: ProductDetailPage, layout: DefaultLayout, title: config.titles.productDetail },
    { path: config.routes.cart, page: CartPage, layout: NoCartIconLayout, title: config.titles.cart },
];

const privateRouters = [
    { path: config.routes.profile, page: ProfileForm, layout: DefaultLayout, title: config.titles.profile },
    { path: config.routes.order, page: OrderPage, layout: NoCartIconLayout, title: config.titles.order },
    { path: config.routes.myOrders, page: MyOrdersPage, layout: NoBreadcrumbLayout, title: config.titles.myOrders },
]

export { publicRouters, privateRouters };
