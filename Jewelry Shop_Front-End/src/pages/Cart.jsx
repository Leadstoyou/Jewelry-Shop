import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShoppingCart from '../components/shoppingCart/Cart';

const CartPage = () => {
  return (
    <div>
    <Navbar className="fixed-navbar" />
    <div style={{marginBottom:'5%'}}>
      <ShoppingCart/>
      </div>
      <Footer/>
    </div>
  );
};




export default CartPage;


