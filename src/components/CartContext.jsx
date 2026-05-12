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
  // 📦 LOAD FROM STORAGE (SAFE VERSION)
  // =========================
  useEffect(() => {

    try {

      const savedCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const savedWishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

      setCart(savedCart);
      setWishlist(savedWishlist);

    } catch (err) {

      console.log("Storage load error:", err);

      setCart([]);
      setWishlist([]);

    }

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
  // ➕ ADD TO CART (SAFE UPDATE)
  // =========================
  const addToCart = (item) => {

    setCart(prev => {

      const exists = prev.find(
        (i) => i.product_id === item.product_id
      );

      if (exists) {

        return prev.map((i) =>
          i.product_id === item.product_id
            ? {
                ...i,
                quantity: (i.quantity || 1) + 1
              }
            : i
        );

      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1
        }
      ];

    });

  };

  // =========================
  // ❌ REMOVE FROM CART
  // =========================
  const removeFromCart = (product_id) => {

    setCart(prev =>
      prev.filter(
        (item) =>
          item.product_id !== product_id
      )
    );

  };

  // =========================
  // ➕ INCREASE QUANTITY
  // =========================
  const increaseQuantity = (product_id) => {

    setCart(prev =>
      prev.map((item) =>
        item.product_id === product_id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1
            }
          : item
      )
    );

  };

  // =========================
  // ➖ DECREASE QUANTITY
  // =========================
  const decreaseQuantity = (product_id) => {

    setCart(prev =>
      prev.map((item) =>
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
  // ❤️ SAVE FOR LATER (WISHLIST FIXED)
  // =========================
  const saveForLater = (item) => {

    setWishlist(prev => {

      const exists = prev.find(
        (i) => i.product_id === item.product_id
      );

      if (exists) return prev;

      return [...prev, item];

    });

  };

  // =========================
  // ❌ REMOVE WISHLIST
  // =========================
  const removeFromWishlist = (product_id) => {

    setWishlist(prev =>
      prev.filter(
        (item) =>
          item.product_id !== product_id
      )
    );

  };

  // =========================
  // 💰 TOTAL PRICE (SAFE)
  // =========================
  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      (
        Number(item.product_cost || item.price || 0) *
        (item.quantity || 1)
      ),
    0
  );

  // =========================
  // 📦 TOTAL ITEMS (NEW ADDITION)
  // =========================
  const cartItemsCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (

    <CartContext.Provider
      value={{

        // cart
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal,
        cartItemsCount,

        // wishlist
        wishlist,
        setWishlist,
        saveForLater,
        removeFromWishlist

      }}
    >

      {children}

    </CartContext.Provider>

  );
};