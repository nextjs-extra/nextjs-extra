import { useSharedValue } from "@nextjs-extra/shared-state";

export default function Product({
  productId,
  show,
}: {
  productId: number;
  show: string;
}) {
  const [{ title, price }] = useSharedValue(`product/${productId}`);
  const [quantity] = useSharedValue(`product/${productId}/${show}`);

  return (
    <div>
      {title} - &#36;{price / 100}
      {quantity ? ` x ${quantity}` : null}
    </div>
  );
}
