export const getGuestCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("guest_cart") || "[]");
};

export const addToGuestCart = (productId: string, qty: number) => {
  const cart = getGuestCart();

  const existing = cart.find((i: any) => i.productId === productId);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ productId, quantity: qty });
  }

  localStorage.setItem("guest_cart", JSON.stringify(cart));
};

export const updateGuestCart = (id: string, qty: number) => {
  const cart = getGuestCart().map((i: any) =>
    i.productId === id ? { ...i, quantity: qty } : i
  );
  localStorage.setItem("guest_cart", JSON.stringify(cart));
};

export const removeGuestCart = (id: string) => {
  const cart = getGuestCart().filter((i: any) => i.productId !== id);
  localStorage.setItem("guest_cart", JSON.stringify(cart));
};