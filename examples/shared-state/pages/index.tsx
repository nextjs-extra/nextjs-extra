import Cart from "../components/Cart";
import ProductsList from "../components/ProductList";

export default function Home() {
  return (
    <div>
      <h2>Shopping Cart Example</h2>
      <hr />
      <ProductsList />
      <Cart />
    </div>
  );
}

export function getServerSideProps() {
  return {
    props: {
      initialState: {
        products: [1, 2, 3],
        "product/1": {
          title: "iPad 4 Mini",
          price: 50001,
        },
        "product/1/inventary": 2,
        "product/2": {
          title: "H&M T-Shirt White",
          price: 1099,
        },
        "product/2/inventary": 10,
        "product/3": {
          title: "Charli XCX - Sucker CD",
          price: 1999,
          inventory: 5,
        },
        "product/3/inventary": 5,
      },
    },
  };
}
