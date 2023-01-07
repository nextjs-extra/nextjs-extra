import { useSharedValue } from "@nextjs-extra/shared-state";
import Product from "./Product";
import AddToCart from "./AddToCart";

function useProductIds() {
  const [productIds] = useSharedValue("products");

  return productIds as number[];
}

export default function ProductsList() {
  const productIds = useProductIds();

  return (
    <div>
      <h3>Products</h3>
      <div>
        {productIds.map((productId) => (
          <>
            <Product key={productId} productId={productId} show="inventary" />
            <AddToCart productId={productId} />
          </>
        ))}
      </div>
    </div>
  );
}
