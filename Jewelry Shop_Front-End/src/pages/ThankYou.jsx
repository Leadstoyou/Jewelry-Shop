import { useEffect } from "react";
import { makeAnNewOrder } from "../api/connectApi";

const ThankYou = () => {
  useEffect(() => {
    async function fetch(){
      await makeAnNewOrder();
    }
    fetch();
  }, []);
  return (
    <div className="thank-you">
      <img src="https://cdn-media-1.freecodecamp.org/images/OG-dIkgxYxWh4SnWn4c1ufA5yfzuDGGDbBYy" />
    </div>
  );
};

export default ThankYou;
