import "./Exchange.scss";
import ExchangeItem from "../../components/ExchangeItem/ExchangeItem";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../fb-config";

const Exchange = () => {
  const [items, setItems] = useState([]);
  const itemsRef = collection(db, "items");

  const getItems = async () => {
    const data = await getDocs(itemsRef);
    const itemsData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(itemsData);
    setItems(itemsData);
  };

  useEffect(() => {
    getItems();
  }, []);

  if (!items) {
    return (
      <div className="exchange">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="exchange">
      <div className="exchange__top">
        <h1 className="exchange__title">Exchange umi points </h1>
        <div className="exchange__points">
          <p className="exchange__balance">320</p>
        </div>
      </div>
      <div className="exchange__items">
        {items.map((item) => {
          console.log(item);

          return <ExchangeItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Exchange;
