import { useSharedState, useSharedValue } from "@nextjs-extra/shared-state";
import { useMemo } from "react";
import Product from "./Product";

export default function Cart() {
  const [cart] = useSharedValue("cart", { defaultValue: [] });
  const sharedState = useSharedState();

  const total = useMemo(() => {
    return cart.reduce((total: number, productId: number) => {
      const { price } = sharedState.getValue(`product/${productId}`);
      const quantity = sharedState.getValue(`product/${productId}/cart`);
      return total + price * quantity;
    }, 0);
  }, [cart, sharedState]);

  return (
    <div>
      <h3>Your Cart</h3>
      <div>
        {cart.length === 0 ? (
          <em>Please add some products to cart.</em>
        ) : (
          cart.map((productId: number) => (
            <Product key={productId} productId={productId} show="cart" />
          ))
        )}
      </div>
      <p>Total: &#36;{total / 100}</p>
      <button
        onClick={() => sharedState.setValue("cart", [])}
        disabled={cart.length === 0}
      >
        Checkout
      </button>
    </div>
  );
}
