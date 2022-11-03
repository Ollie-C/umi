import "./Establishment.scss";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../fb-config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Establishment = () => {
  const { establishmentId } = useParams();
  const establishmentDocRef = doc(db, "establishments", establishmentId);
  const [currentEstablishment, setCurrentEstablishment] = useState([]);

  const getCurrentEstablishment = async () => {
    try {
      if (auth) {
        const docSnap = await getDoc(establishmentDocRef);
        setCurrentEstablishment(docSnap.data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentEstablishment();
  }, []);

  if (!currentEstablishment) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="establishment">
      <h1 className="establishment__title">{currentEstablishment.name}</h1>
    </div>
  );
};

export default Establishment;
