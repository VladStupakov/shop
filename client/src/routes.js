import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Register from "./pages/Register";
import { LOGIN_ROUTE, CART_ROUTE, HOME_PAGE_ROUTE, PRODUCTS_LIST_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: CART_ROUTE,
        Component: <Cart/>
    },
]

export const publicRoutes = [
    {
        path: HOME_PAGE_ROUTE,
        Component: <Home/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Register/>
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: <Product/>
    },
    {
        path: PRODUCTS_LIST_ROUTE ,
        Component: <Products/>
    },
]