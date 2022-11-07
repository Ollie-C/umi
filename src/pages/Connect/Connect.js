import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../fb-config";
import { Link, useNavigate } from "react-router-dom";
import "./Connect.scss";

const Connect = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [establishment, setEstablishtment] = useState({
    name: "",
    ownerId: String(user.uid),
    address: "",
    postcode: "",
    category: "",
    description: "",
    initiatives: {
      handmade: false,
      local: true,
      organic: true,
      plantBased: true,
      renewableEnergy: false,
      reuse: false,
      zeroWaste: false,
    },
  });

  console.log(user.uid);

  const addEstablishment = async () => {
    const newEstablishmentRef = doc(collection(db, "establishments"));

    await setDoc(newEstablishmentRef, establishment);
  };

  // later...

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEstablishtment({ ...establishment, [name]: value });

    console.log(establishment);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addEstablishment();
    console.log("Submitted.");
  };

  return (
    <>
      <div className="connect">
        <h1 className="connect__header">Sign Up</h1>
        <form
          id="connectform"
          className="connect__form"
          onSubmit={submitHandler}
        >
          <div className="connect__fields">
            <label htmlFor="name" className="connect__label">
              Name:
            </label>
            <input
              type="text"
              className="connect__input"
              name="name"
              placeholder="Name of organisation"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="connect__fields">
            <label htmlFor="address" className="connect__label">
              Address:
            </label>
            <input
              type="text"
              className="connect__input"
              name="address"
              placeholder="First line of the address"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="connect__fields">
            <label htmlFor="postcode" className="connect__label">
              postcode:
            </label>
            <input
              type="text"
              className="connect__input"
              name="postcode"
              placeholder="Enter the postcode"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="connect__fields">
            <label htmlFor="category" className="connect__label">
              Category
            </label>
            <select
              name="category"
              className="addI-form__input addI-form__input--dropdown"
              onChange={(e) => handleChange(e)}
            >
              <option value="Cafe">Cafe</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Groceries">Groceries</option>
            </select>
          </div>
          <div className="connect__fields">
            <label htmlFor="description" className="connect__label">
              Description:
            </label>
            <input
              type="text"
              className="connect__input"
              name="description"
              placeholder="Give a brief description (max 30 characters)"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="connect__fields">
            <p>Initiatives</p>
            <label htmlFor="zeroWaste" className="connect__label">
              Zero-waste:
            </label>
            <input
              type="checkbox"
              name="zeroWaste"
              value="zeroWaste"
              className="connect__checkboxes"
            />
            <label htmlFor="reuse" className="connect__label">
              Re-use, Re-cycle, Upcycle:
            </label>
            <input
              type="checkbox"
              name="reuse"
              value="reuse"
              className="connect__checkboxes"
            />
            <label htmlFor="plantBased" className="connect__label">
              Plant-based:
            </label>
            <input
              type="checkbox"
              name="plantBased"
              value="plantBased"
              className="connect__checkboxes"
            />
            <label htmlFor="handmade" className="connect__label">
              Handmade:
            </label>
            <input
              type="checkbox"
              name="handmade"
              value="handmade"
              className="connect__checkboxes"
            />
            <label htmlFor="organic" className="connect__label">
              Organic:
            </label>
            <input
              type="checkbox"
              name="organic"
              value="organic"
              className="connect__checkboxes"
            />
            <label htmlFor="local" className="connect__label">
              Locally sourced:
            </label>
            <input
              type="checkbox"
              name="local"
              value="local"
              className="connect__checkboxes"
            />
            <label htmlFor="renewableEnergy" className="connect__label">
              Renewable Energy:
            </label>
            <input
              type="checkbox"
              name="renewableEnergy"
              value="renewableEnergy"
              className="connect__checkboxes"
            />
          </div>
          <div className="connect__button-wrapper">
            <button className="connect__button" form="connectform">
              SUBMIT
            </button>
            <Link className="connect__cancel" to="/">
              CANCEL
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Connect;
