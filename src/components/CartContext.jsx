import {
  createContext,
  useEffect,
  useState
} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // =========================
  // 🛒 CART STATE
  // =========================
  const [cart, setCart] = useState([]);

  // ❤️ WISHLIST STATE
  const [wishlist, setWishlist] = useState([]);

  // =========================
  // 📦 LOAD FROM STORAGE
  // =========================
  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setCart(savedCart);
    setWishlist(savedWishlist);

  }, []);

  // =========================
  // 💾 SAVE CART
  // =========================
  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  // =========================
  // 💾 SAVE WISHLIST
  // =========================
  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);

  // =========================
  // ➕ ADD TO CART
  // =========================
  const addToCart = (item) => {

    const exists = cart.find(
      (i) =>
        i.product_id === item.product_id
    );

    if (exists) {

      setCart(
        cart.map((i) =>
          i.product_id === item.product_id
            ? {
                ...i,
                quantity:
                  (i.quantity || 1) + 1
              }
            : i
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...item,
          quantity: 1
        }
      ]);

    }
  };

  // =========================
  // ❌ REMOVE FROM CART
  // =========================
  const removeFromCart = (product_id) => {

    setCart(
      cart.filter(
        (item) =>
          item.product_id !== product_id
      )
    );
  };

  // =========================
  // ➕ INCREASE QUANTITY
  // =========================
  const increaseQuantity = (product_id) => {

    setCart(
      cart.map((item) =>
        item.product_id === product_id
          ? {
              ...item,
              quantity:
                (item.quantity || 1) + 1
            }
          : item
      )
    );
  };

  // =========================
  // ➖ DECREASE QUANTITY
  // =========================
  const decreaseQuantity = (product_id) => {

    setCart(
      cart.map((item) =>
        item.product_id === product_id
          ? {
              ...item,
              quantity: Math.max(
                (item.quantity || 1) - 1,
                1
              )
            }
          : item
      )
    );
  };

  // =========================
  // 🧹 CLEAR CART
  // =========================
  const clearCart = () => {

    setCart([]);

  };

  // =========================
  // ❤️ SAVE FOR LATER
  // =========================
  const saveForLater = (item) => {

    const exists = wishlist.find(
      (i) =>
        i.product_id === item.product_id
    );

    if (!exists) {

      setWishlist([
        ...wishlist,
        item
      ]);

    }
  };

  // =========================
  // ❌ REMOVE WISHLIST
  // =========================
  const removeFromWishlist = (product_id) => {

    setWishlist(
      wishlist.filter(
        (item) =>
          item.product_id !== product_id
      )
    );
  };

  // =========================
  // 💰 TOTAL PRICE
  // =========================
  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      (
        Number(item.product_cost) *
        (item.quantity || 1)
      ),
    0
  );

  return (

    <CartContext.Provider
      value={{

        // cart
        cart,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,

        // wishlist
        wishlist,
        saveForLater,
        removeFromWishlist

      }}
    >

      {children}

    </CartContext.Provider>
  );
};