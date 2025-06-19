import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartSectionProps {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  total: number;
}

const CartSection: React.FC<CartSectionProps> = ({
  cart,
  removeFromCart,
  updateQuantity,
  total,
}) => {
  return (
    <div className="col-span-1 ">
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-text-muted dark:text-gray-400">No tickets selected yet.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <p className="text-text-light dark:text-text-dark">
                {item.name} - ${item.price} x{' '}
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10))
                  }
                  className="w-12 text-center border rounded"
                />
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <p className="text-xl font-bold mt-4 text-text-light dark:text-text-dark">
            Total: ${total}
          </p>
        </div>
      )}
    </div>
  );
};

export default CartSection;
