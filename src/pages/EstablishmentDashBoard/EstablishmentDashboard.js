import "./EstablishmentDashboard.scss";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../fb-config";
import { Icon } from "@iconify/react";
import { UserAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const EstablishmentDashboard = () => {
  const [currentEstablishment, setCurrentEstablishment] = useState({});
  const [qrcode, setQrcode] = useState("");
  const { user } = UserAuth();
  const { id } = useParams();

  const baseURL = "https://umi-lime.vercel.app/";

  let token = uuidv4();
  let url = `${baseURL}/${id}/collect/${token}`;
  console.log(url);

  const establishmentRef = doc(db, "establishments", id);

  const getEstablishment = async () => {
    try {
      const docSnap = await getDoc(establishmentRef);
      const establishmentData = docSnap.data();
      setCurrentEstablishment(establishmentData);
    } catch (error) {
      console.log(error);
    }
  };

  const GenerateQRCode = async () => {
    QRCode.toDataURL(url, (err, url) => {
      if (err) return console.log(err);
      setQrcode(url);
    });
    await updateDoc(establishmentRef, { rewardId: token });
  };

  useEffect(() => {
    getEstablishment();
    console.log(currentEstablishment);
  }, []);

  if (!user) {
    return (
      <div className="dashboard">
        <h1>Please log in</h1>
      </div>
    );
  }

  if (user.uid !== currentEstablishment.ownerId) {
    return (
      <div className="dashboard">
        <h1>Authorising...</h1>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <h1 className="dashboard__header">Dashboard</h1>
      <div className="dashboard__card-wrapper">
        <div className="dashboard__card">
          <div className="dashboard__top">
            <h3 className="dashboard__card-header">Generate QR code </h3>
          </div>
          <div className="dashboard__bottom">
            {qrcode && (
              <>
                <img
                  className="dashboard__qrcode"
                  src={qrcode}
                  alt="establishment-qrcode"
                />
              </>
            )}
            {!qrcode ? (
              <Icon
                onClick={GenerateQRCode}
                icon="carbon:add-alt"
                color="black"
                height="80"
              />
            ) : (
              <Icon
                icon="foundation:refresh"
                color="black"
                height="40"
                onClick={GenerateQRCode}
              />
            )}
          </div>
        </div>
        {/* <Link to={url}>Collect</Link> */}
        <div className="dashboard__card">
          <div className="dashboard__top">
            <h3 className="dashboard__card-header">Establishment details </h3>
          </div>
          <div className="dashboard__bottom">
            <label className="dashboard__label">name</label>
            <div className="detail-wrapper">
              <p className="dashboard__detail">{currentEstablishment.name}</p>
              <Icon icon="ant-design:edit-filled" color="black" height="20" />
            </div>
            <label className="dashboard__label">address</label>
            <div className="detail-wrapper">
              <p className="dashboard__detail">
                {currentEstablishment.address}, {currentEstablishment.postcode}
              </p>
              <Icon icon="ant-design:edit-filled" color="black" height="20" />
            </div>
          </div>
        </div>
        <div className="dashboard__card">
          <div className="dashboard__top">
            <h3 className="dashboard__card-header">Sustainable Initiatives </h3>
          </div>
          <div className="dashboard__bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentDashboard;
