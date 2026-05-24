export function formatPrice(price) {
  if (!price) return "Free";

  const amount = Number(price.amount || 0);
  const currency = price.currency || "USD";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function formatDuration(seconds) {
  if (!seconds) return "0 min";

  const totalMinutes = Math.ceil(Number(seconds) / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}