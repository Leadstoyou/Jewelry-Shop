import { useEffect } from "react";
import { createNewOrder } from "../api/connectApi";

const ThankYou = () => {
  useEffect(() => {
    async function doneOrder() {
      try {
        await createNewOrder()
      } catch (error) {
        console.log("🚀 ~ file: ThankYou.jsx:10 ~ doneOrder ~ error:", error);
      }
    }
    doneOrder();
  }, []);
  return (
    <div className="thank-you">
      <img src="https://cdn-media-1.freecodecamp.org/images/OG-dIkgxYxWh4SnWn4c1ufA5yfzuDGGDbBYy" />
    </div>
  );
};

export default ThankYou;
