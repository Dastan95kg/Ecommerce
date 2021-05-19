import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from './firebase';
import { currentUser } from './functions/auth';
// using lazy
const Header = lazy(() => import('./components/nav/Header'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const Home = lazy(() => import('./pages/home/Home'))
const History = lazy(() => import('./pages/user/History'))
const Password = lazy(() => import('./pages/user/Password'))
const Wishlist = lazy(() => import('./pages/user/Wishlist'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const UserRoute = lazy(() => import('./components/routes/UserRoute'))
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'))
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'))
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'))
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'))
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'))
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'))
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'))
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'))
const Product = lazy(() => import('./pages/home/Product'))
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'))
const SubHome = lazy(() => import('./pages/sub/SubHome'))
const Shop = lazy(() => import('./pages/shop/Shop'))
const Cart = lazy(() => import('./pages/cart/Cart'))
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'))
const Checkout = lazy(() => import('./pages/checkout/Checkout'))
const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'))
const Payment = lazy(() => import('./pages/payment/Payment'))

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
          .then(res => {
            const { data } = res
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: data.name,
                email: data.email,
                role: data.role,
                _id: data._id,
                token: idTokenResult.token
              }
            })
          })
          .catch(err => console.log(err))
      }
    })

    updateCart()

    // cleanup
    return () => unsubscribe()
  }, [])

  const updateCart = () => {
    const storageData = localStorage.getItem('cart')
    if (storageData) {
      dispatch({ type: 'ADD_TO_CART', payload: JSON.parse(storageData) })
    }
  }

  return (
    <Suspense fallback={
      <div className="col p-5 text-center">__ React Redux EC<LoadingOutlined />mmerce __</div>
    }>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />

        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />
      </Switch>
    </Suspense>
  )
}

export default App;
