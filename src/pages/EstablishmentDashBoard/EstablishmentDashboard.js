import "./EstablishmentDashboard.scss";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../fb-config";
import { Link } from "react-router-dom";

const EstablishmentDashboard = () => {
  const [qrcode, setQrcode] = useState("");
  let token = uuidv4();
  const testBusinessId = "952AzzmM4LImBQRABvOT";
  //http://192.168.1.64:3000/952AzzmM4LImBQRABvOT/collect
  let url = `/${testBusinessId}/collect/${token}`;

  const testBusiness = doc(db, "establishments", testBusinessId);

  const GenerateQRCode = async () => {
    QRCode.toDataURL(url, (err, url) => {
      if (err) return console.log(err);
      setQrcode(url);
    });
    await updateDoc(testBusiness, { rewardId: token });
    console.log(token);
  };

  return (
    <div className="dashboard">
      <h1>Welcome to your dashboard</h1>
      <div className="qrtest">
        <button onClick={GenerateQRCode}>Generate Token</button>
        {qrcode && (
          <>
            <img src={qrcode} alt="" />
            <Link to={url}>Collect</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default EstablishmentDashboard;
