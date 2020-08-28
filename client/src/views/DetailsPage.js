import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ReactTooltip from "react-tooltip";
import offerStatus from "../assets/data/offerStatus";
import { AppContext } from "../context";

const strToArray = (str) => {
  if (str === "" || !str) {
    return [];
  }
  let list = [];
  list = str.split(/\n/);
  return list;
};

export default function DetailsPage(props) {
  const [formattedOffer, setFormattedOffer] = useState({});
  const [offerLoading, setOfferLoading] = useState(true);
  const [offerNotFound, setOfferNotFound] = useState(false);

  const id = props.location.pathname.substr(16);

  const context = useContext(AppContext);

  useEffect(() => {
    setOfferLoading(true);
    if (!context.state.offers.length) return;

    const prepareForDisplay = (obj) => {
      const newObj = { ...obj };
      newObj.offer = strToArray(obj.offer);
      newObj.techStack = strToArray(obj.techStack);
      newObj.skills = strToArray(obj.skills);
      newObj.addSkills = strToArray(obj.addSkills);
      newObj.description = strToArray(obj.description);
      setFormattedOffer(newObj);
      setOfferLoading(false);
    };
    const offers = context.state.offers.slice();
    let offer = offers.find((of) => of._id === id);
    if (!offer) {
      setOfferNotFound(true);
      return;
    }
    prepareForDisplay(offer);
    if (context.state.redirect) {
      context.resetRedirect();
    }
  }, [context.state.offers]);

  if (offerLoading && !offerNotFound) {
    return (
      <Layout>
        <p>Offer is loading...</p>
      </Layout>
    );
  }

  if (offerNotFound) {
    return (
      <Layout>
        {" "}
        <p>Offer not found.</p>
      </Layout>
    );
  }

  const deleteButton = (
    <button
      className="button is-small is-dark ml-3"
      onClick={(e) => context.setActionType(e, "Delete", formattedOffer._id)}
    >
      Delete
    </button>
  );

  // if (true) {
  //   return <p>test</p>;
  // }

  return (
    <Layout>
      <h2>Details</h2>
      <div>
        <Link to={`/offers/details/${formattedOffer._id}/edit`}>
          <button className="button is-small is-link">Edit</button>
        </Link>
        {deleteButton}
      </div>
      <div className="content mt-5">
        <ReactTooltip place="top" type="dark" effect="float">
          {offerStatus.msg[formattedOffer.status]}
        </ReactTooltip>
        <p className="title is-4">
          <a data-tip="React-tooltip" href=" ">
            <button
              className={`button button--status is-small mr-2 ${
                offerStatus.color[formattedOffer.status]
              }`}
            ></button>
          </a>
          {formattedOffer.company}
        </p>
        <p className="title is-4">
          <a
            href={formattedOffer.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {formattedOffer.position}
          </a>
        </p>
        <p className="title is-5 mt-5">{formattedOffer.city}</p>
        <p> {formattedOffer.address}</p>
        <p className="title is-5 mt-5">Poziom:</p>
        <p>{formattedOffer.level}</p>
        <p className="title is-5 mt-5">Widełki:</p>
        <p>{formattedOffer.payScales}</p>
        <p className="title is-5 mt-5">Technologie:</p>
        <ul>
          {formattedOffer.techStack.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <p className="title is-5 mt-5">Opis:</p>
        {formattedOffer.description.map((el, index) => (
          <p key={index}>{el}</p>
        ))}
        <p className="title is-5 mt-5">Wymagania:</p>
        <ul>
          {formattedOffer.skills.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <p className="title is-5 mt-5">Mile widziane:</p>
        <ul>
          {formattedOffer.addSkills.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <p className="title is-5 mt-5">Oferta:</p>
        <ul>
          {formattedOffer.offer.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <p>{formattedOffer.deadline}</p>
        <p className="title is-5 mt-5">Uwagi:</p>
        <p>{formattedOffer.remarks}</p>
        <div>
          <Link to={`/offers/details/${formattedOffer._id}/edit`}>
            <button className="button is-small is-link">Edit</button>
          </Link>
          {deleteButton}
        </div>
      </div>
    </Layout>
  );
}
