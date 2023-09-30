import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShoppingCart from '../components/shoppingCart/Cart';

const CartPage = () => {
  return (
    <div>
    <Navbar className="fixed-navbar" />
      <ShoppingCart />
      <Footer/>
    </div>
  );
};




export default CartPage;


