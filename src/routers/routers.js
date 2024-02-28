import config from '@/config';

// import AboutUs from '@/pages/AboutUs';
// import Blog from '@/pages/Blog';
// import Cart from '@/pages/Cart';
// import Contact from '@/pages/Contact';

// import PageNotFound from '@/pages/PageNotFound/PageNotFound';
// import Product from '@/pages/Product';
// import ProductDetail from '@/pages/ProductDetail';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import { HomePage } from '@/pages';
import ProfileForm from '@/forms/ProfileForm/ProfileForm';

const publicRouters = [
    { path: config.routes.home, page: HomePage, layout: DefaultLayout },
    // { path: config.routes.product, page: Product },
    // { path: `${config.routes.product}/:id`, page: ProductDetail },
    // { path: config.routes.contact, page: Contact },
    // { path: config.routes.aboutUs, page: AboutUs },
    // { path: config.routes.blog, page: Blog },
    // { path: config.routes.cart, page: Cart },
];

const privateRouters = [
    { path: config.routes.profile, page: ProfileForm, layout: DefaultLayout },
]

export { publicRouters, privateRouters };
