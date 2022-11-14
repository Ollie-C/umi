import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { doc, setDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../fb-config";
import { Link, useNavigate } from "react-router-dom";
import "./Connect.scss";
import { v4 } from "uuid";

const Connect = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const storage = getStorage();
  const imageId = v4();
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
    imageId: imageId,
  });
  const [image, setImage] = useState(null);

  const addEstablishment = async () => {
    if (image) {
      const imageRef = ref(storage, `images/${imageId}/${image.name}`);
      await uploadBytes(imageRef, image, imageId);
    }
    const newEstablishmentRef = doc(collection(db, "establishments"));
    await setDoc(newEstablishmentRef, establishment);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstablishtment({ ...establishment, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !establishment.name ||
      !establishment.address ||
      !establishment.postcode
    ) {
      alert("Please fill in all fields.");
      return false;
    }
    addEstablishment();
    navigate("/profile");
  };

  return (
    <>
      <div className="connect">
        <h1 className="connect__header">Add your organisation</h1>

        <form
          id="connectform"
          className="connect__form"
          onSubmit={submitHandler}
        >
          <div className="form__left">
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
              <label className="connect__label">Image:</label>
              <input
                className="connect__addimage"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
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
                className="connect__input"
                onChange={(e) => handleChange(e)}
              >
                <option value="Cafe">Cafe</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Groceries">Groceries</option>
              </select>
            </div>
          </div>
          <div className="form__right">
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
              <div className="field-wrapper">
                <label htmlFor="zeroWaste" className="connect__label">
                  Zero-waste:
                </label>
                <input
                  type="checkbox"
                  name="zeroWaste"
                  value="zeroWaste"
                  className="connect__checkboxes"
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="reuse" className="connect__label">
                  Re-use, Re-cycle, Upcycle:
                </label>
                <input
                  type="checkbox"
                  name="reuse"
                  value="reuse"
                  className="connect__checkboxes"
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="plantBased" className="connect__label">
                  Plant-based:
                </label>
                <input
                  type="checkbox"
                  name="plantBased"
                  value="plantBased"
                  className="connect__checkboxes"
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="handmade" className="connect__label">
                  Handmade:
                </label>
                <input
                  type="checkbox"
                  name="handmade"
                  value="handmade"
                  className="connect__checkboxes"
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="organic" className="connect__label">
                  Organic:
                </label>
                <input
                  type="checkbox"
                  name="organic"
                  value="organic"
                  className="connect__checkboxes"
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="local" className="connect__label">
                  Locally sourced:
                </label>
                <input
                  type="checkbox"
                  name="local"
                  value="local"
                  className="connect__checkboxes"
                />
              </div>
              <div className="field-wrapper">
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
            </div>
          </div>
        </form>
        <div className="connect__button-wrapper">
          <button className="connect__button" form="connectform">
            SUBMIT
          </button>
          <Link className="connect__cancel" to="/">
            CANCEL
          </Link>
        </div>
      </div>
    </>
  );
};

export default Connect;
