'use client';
import CartSection from '@/app/components/Cart';
import Button from '@/app/components/CustomBotton';
import EventDetails from '@/app/components/EventDetails';
import TicketSelection from '@/app/components/Tickets';
import React, { useState } from 'react';


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const PurchasePage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addToCart = (ticket: { id: number; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === ticket.id);
      if (existing) {
        return prev.map((item) =>
          item.id === ticket.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Add a default quantity field here
      return [...prev, { ...ticket, quantity: 1 }];
    });
  };
  
  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-[10%] py-8 bg-background-light dark:bg-background-dark">
      {/* Event Details */}
      <EventDetails />

      {/* Ticket Selection */}
      <TicketSelection addToCart={addToCart} />

      {/* Cart Section */}
      <CartSection
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        total={total}
      />

      {/* CTA */}
      <div className="flex justify-end mt-8">
        <Button
          label="Proceed to Payment"
          className="bg-primary dark:bg-accent hover:bg-hoverEffects-gold text-white py-3 px-6 "
          onClick={() => alert('Redirecting to payment page...')}
        />
      </div>
    </div>
  );
};

export default PurchasePage;
