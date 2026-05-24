import { formatPrice } from "@/lib/utils/format";

export default function PriceText({ price, className }) {
  if (!price) {
    return <span className={className}>Free</span>;
  }

  const suffix =
    price.priceType === "SUBSCRIPTION" && price.billingInterval
      ? `/${price.billingInterval.toLowerCase()}`
      : "";

  return (
    <span className={className}>
      {formatPrice(price)}
      {suffix}
    </span>
  );
}