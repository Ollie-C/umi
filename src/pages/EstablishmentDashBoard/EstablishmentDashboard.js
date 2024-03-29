import "./EstablishmentDashboard.scss";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../fb-config";
import { UserAuth } from "../../context/AuthContext";
import { useParams, useNavigate, Link } from "react-router-dom";

//ICONS
import { Icon } from "@iconify/react";
import zeroWaste from "../../assets/icons/zeroWaste.png";
import local from "../../assets/icons/place.png";
import handMade from "../../assets/icons/hand-made.png";

const EstablishmentDashboard = () => {
  const [currentEstablishment, setCurrentEstablishment] = useState({});
  const [qrcode, setQrcode] = useState("");
  const { user } = UserAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const baseURL = "https://umi-lime.vercel.app";
  const token = uuidv4();
  let url = `${baseURL}/${id}/collect/${token}`;
  // let url = `/${id}/collect/${token}`; -> for testing purposes

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

  const deleteEstablishment = async () => {
    try {
      await deleteDoc(establishmentRef);
      navigate("/");
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
    // navigate(`${url}`); -> for testing purposes
  };

  useEffect(() => {
    getEstablishment();
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
        <h1>You must be the owner to view this page.</h1>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <h1 className="dashboard__header">Welcome to Your Dashboard</h1>

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
                height="120"
              />
            ) : (
              <Icon
                icon="foundation:refresh"
                color="black"
                height="40"
                className="regenerate"
                onClick={GenerateQRCode}
              />
            )}
          </div>
        </div>
        <div className="dashboard__card">
          <div className="dashboard__top">
            <h3 className="dashboard__card-header">Establishment details </h3>
          </div>
          <div className="dashboard__bottom">
            <label className="dashboard__label">NAME</label>
            <div className="detail-wrapper">
              <p className="dashboard__detail">{currentEstablishment.name}</p>
              <Icon
                className="dashboard__icon"
                icon="ant-design:edit-filled"
                color="black"
                height="20"
              />
            </div>
            <label className="dashboard__label">ADDRESS</label>
            <div className="detail-wrapper">
              <p className="dashboard__detail">
                {currentEstablishment.address}, {currentEstablishment.postcode}
              </p>
              <Icon
                className="dashboard__icon"
                icon="ant-design:edit-filled"
                color="black"
                height="20"
              />
            </div>
            <label className="dashboard__label">VISITORS</label>
            <div className="detail-wrapper">
              <p className="dashboard__detail">
                {currentEstablishment.visitors
                  ? currentEstablishment.visitors
                  : "No visitors yet!"}
              </p>
            </div>
          </div>
        </div>
        <div className="dashboard__card">
          <div className="dashboard__top">
            <h3 className="dashboard__card-header">Sustainable Initiatives </h3>
          </div>
          <div className="dashboard__bottom">
            <div className="dashboard-icon-wrapper">
              <p className="dashboard__label">LOCALLY-SOURCED</p>
              <img src={local} className="dashboard__icon"></img>
            </div>
            <div className="dashboard-icon-wrapper">
              <p className="dashboard__label">ZERO-WASTE</p>
              <img src={zeroWaste} className="dashboard__icon"></img>
            </div>
            <div className="dashboard-icon-wrapper">
              <p className="dashboard__label">HAND-MADE</p>
              <img src={handMade} className="dashboard__icon"></img>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => deleteEstablishment()}
        className="dashboard__delete"
      >
        Delete Establishment
      </button>
    </div>
  );
};

export default EstablishmentDashboard;
