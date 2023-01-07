import { useSharedResource, useSharedValue } from "@nextjs-extra/shared-state";

const emptyCart: number[] = [];

export default function AddToCart({ productId }: { productId: number }) {
  const cartQuantityResource = useSharedResource(`product/${productId}/cart`, {
    defaultValue: 0,
  });
  const cartResource = useSharedResource(`cart`, { defaultValue: emptyCart });

  const [inventory, setInventory] = useSharedValue(
    `product/${productId}/inventary`
  );

  const addToCart = () => {
    setInventory(inventory - 1);
    cartQuantityResource.setValue(cartQuantityResource.getValue() + 1);

    const cart = [...cartResource.getValue()];

    if (!cart.includes(productId)) {
      cart.push(productId);
    }
    cartResource.setValue(cart);
  };

  if (inventory <= 0) {
    return <span>Sold Out</span>;
  }

  return <button onClick={addToCart}>Add to cart</button>;
}
