import SignInForm from "./components/Form/SignIn/SignInForm";
import SignUpForm from "./components/Form/SignUp/SignUpForm";
import Layout from './components/Layout/Layout';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Order from "./components/pages/order/Order";
import { ShopContextProvider } from "./context/shop-context";
import Contact from "./components/pages/contact/Contact";
import Administrator from './components/pages/administrator/Administrator';
import { useState } from "react";
import AdminLayout from "./components/Layout/AdminLayout";
import AddFoodItems from "./components/pages/administrator/AddFoodItems";
import GetFoodItems from "./components/pages/administrator/GetFoodItems";
import Profile from "./components/pages/Profile/Profile";
import CheckoutPopup from "./components/pages/order/order-comp/CheckoutPopup";
import ContactUsInquiries from "./components/pages/administrator/ContactUsInquiries";
import CarouselAdministrator from "./components/pages/administrator/CarouselAdministrator";
import PageNotFound from "./components/pages/404/PageNotFound";
import OrderStatus from "./components/pages/administrator/OrderStatus";
import MyOrders from "./components/pages/notification/MyOrders";
import GenerateReport from "./components/pages/administrator/GenerateReport";

function App() {
  return (
    <div className="app">
        <ShopContextProvider>
          <Router>
            <div>
              <Routes>
                <Route path="/sign-in-form" element={<SignInForm />}/>
                <Route path="/sign-up-form" element={<SignUpForm />}/>

                <Route path="/administrator/*" element={<AdminLayout />}>
                  <Route path="" element={<Administrator />}/>
                  <Route path="add-food" element={<AddFoodItems />}/>
                  <Route path="get-food" element={<GetFoodItems />}/>
                  <Route path="get-contact-us-inquiries" element={<ContactUsInquiries />}/>
                  <Route path="carousel-administrator" element={<CarouselAdministrator />}/>
                  <Route path="order-status" element={<OrderStatus />}/>
                  <Route path="report" element={<GenerateReport />}/>
                </Route>

                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Order />} />
                  <Route path="/checkout" element={<CheckoutPopup />} />
                  <Route path="contact" element={<Contact />}/>
                  <Route path="profile" element={<Profile />}/>
                  <Route path="my-orders" element={<MyOrders/>}/>
                </Route>
                <Route path="*" element={<PageNotFound />}/>
              </Routes>
            </div>
          </Router>
        </ShopContextProvider>
    </div>
  );
}

export default App;
