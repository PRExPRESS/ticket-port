'use client';
import CartSection from '@/app/components/Cart';
import Button from '@/app/components/CustomBotton';
import EventDetails from '@/app/components/EventDetails';
import TicketSelection from '@/app/components/Tickets';
import Link from 'next/link';
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
    <div className="container mx-auto  py-8 bg-background-light dark:bg-background-dark">
      {/* Event Details */}
      <EventDetails />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Ticket Selection */}
        <TicketSelection addToCart={addToCart} />
        {/* Cart Section */}
        <div className="col-span-1 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <CartSection
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            total={total}
          />

          {/* CTA */}
          <div className="flex justify-end mt-8">
            <Link href={`/payment/${1}?total=${total}`} className={`bg-primary dark:bg-accent hover:bg-hoverEffects-gold text-white py-3 px-6`}>
            Proceed to Payment
            </Link>
            
          </div>
        </div>

      </div>


    </div>
  );
};

export default PurchasePage;
