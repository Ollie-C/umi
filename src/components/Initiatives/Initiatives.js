import React from "react";
//Images
import zeroWaste from "../../assets/icons/zeroWaste.png";
import ecoEnergy from "../../assets/icons/eco-light.png";
import organic from "../../assets/icons/organic.png";
import local from "../../assets/icons/place.png";
import reuse from "../../assets/icons/reuse.png";
import plantBased from "../../assets/icons/vegan.png";
import handMade from "../../assets/icons/hand-made.png";

const Initiatives = () => {
  return (
    <div className="sustainable">
      <div className="sustainable__about">
        <h2 className="sustainable__title">What is umi.card?</h2>
        <p>
          Umi 海, Japanese for ocean or sea, is a way to help people think about
          the way they shop by rewarding users for choosing an eco-friendly
          alternative to their usual choices. Umi.card skips past the tick-bock
          initiatives and filters out companies employing greenwashing
          techniques to connect with eco-friendly businesses, events and
          charities.
        </p>
      </div>

      <div className="sustainable__initiatives">
        <h2 className="sustainable__title">Sustainable Initiatives</h2>
        <div className="icons-wrapper">
          <div className="initiative-card">
            <img
              src={zeroWaste}
              alt="zero waste icon"
              className="initiative-card__icon"
            ></img>
            <h3 className="initiative-card__name">Zero waste</h3>
            <p className="initiative-card__text">
              Bulk selling in resuable packaging
            </p>
          </div>
          <div className="initiative-card">
            <img
              src={ecoEnergy}
              alt="eco energy icon"
              className="initiative-card__icon"
            ></img>
            <h3 className="initiative-card__name">Renewable Energy</h3>
            <p className="initiative-card__text">
              Majority of energy usage is from renewable sources
            </p>
          </div>
          <div className="initiative-card">
            <img
              src={organic}
              alt="organic icon"
              className="initiative-card__icon"
            ></img>
            <h3 className="initiative-card__name">Organic</h3>
            <p className="initiative-card__text">
              Organic or natural ingredients sustainably farmed
            </p>
          </div>
          <div className="initiative-card">
            <img
              src={local}
              alt="local source icon"
              className="initiative-card__icon"
            ></img>
            <h3 className="initiative-card__name">Locally-sourced</h3>
            <p className="initiative-card__text">
              Products made from ingredients sourced locally
            </p>
          </div>
          <div className="initiative-card">
            <img
              src={reuse}
              alt="reuse icon"
              className="initiative-card__icon"
            ></img>
            <h3 className="initiative-card__name">Reuse/Upcycle/Recycle</h3>
            <p className="initiative-card__text">Share products and services</p>
          </div>
          <div className="initiative-card">
            <img
              src={plantBased}
              alt="plant-based icon"
              className="initiative-card__icon"
            ></img>
            <h3 className="initiative-card__name">Plant-based</h3>
            <p className="initiative-card__text">
              Products using minimal water to produce and are not derived from
              or contain meat or dairy
            </p>
          </div>
          <div className="initiative-card">
            <img
              src={handMade}
              alt="handmade product icon"
              className="initiative-card__icon"
            ></img>
            <h3 className="initiative-card__name">Hand-made</h3>
            <p className="initiative-card__text">
              Products and services crafted domestically from raw materials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Initiatives;
