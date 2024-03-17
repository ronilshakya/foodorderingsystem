import SignInForm from "./components/Form/SignIn/SignInForm";
import SignUpForm from "./components/Form/SignUp/SignUpForm";
import Layout from './components/Layout/Layout';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Order from "./components/pages/order/Order";
import { ShopContextProvider } from "./context/shop-context";
import Contact from "./components/pages/contact/Contact";
import About from "./components/pages/about/About";
import Administrator from './components/pages/administrator/Administrator';
import { useState } from "react";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminLogin from "./components/pages/administrator/AdminLogin";

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
                  <Route path="" element={<AdminLogin />}/>
                  <Route path="user" element={<Administrator />}/>
                </Route>

                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Order />} />
                  <Route path="about" element={<About />}/>
                  <Route path="contact" element={<Contact />}/>
                </Route>

              </Routes>
            </div>
          </Router>
        </ShopContextProvider>
    </div>
  );
}

export default App;
