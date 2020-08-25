import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import offerStatus from "../assets/data/offerStatus";

const strToArray = (str) => {
  if (str === "") {
    return [];
  }
  let list = str.split(/\n/);
  return list;
};
export default function DetailsPage(props) {
  const [offer, setOffer] = useState({});
  const [offerLoading, setOfferLoading] = useState(true);
  const [offerNotFound, setOfferNotFound] = useState(false);

  const id = props.location.pathname.substr(16);

  useEffect(() => {
    const prepareForDisplay = (offer) => {
      offer.offer = strToArray(offer.offer);
      offer.techStack = strToArray(offer.techStack);
      offer.skills = strToArray(offer.skills);
      offer.addSkills = strToArray(offer.addSkills);
      offer.description = strToArray(offer.description);
      setOffer(offer);
      // console.log(offer);
      setOfferLoading(false);
    };

    if (props.location.state) {
      if (props.location.state.offer) {
        // updated object from edit form
        console.log("updated object from edit form");
        console.log(props.location.state.offer);
        prepareForDisplay(props.location.state.offer);
      }
      return;
    }

    console.log(props.location.state);
    axios
      .get(`/api/offers/${id}`)
      .then((res) => {
        prepareForDisplay(res.data);
      })
      .catch((err) => {
        console.log(err);
        setOfferNotFound(true);
      });
  }, [id, props.location.state]);

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

  return (
    <Layout>
      <h2>Details</h2>
      <div>
        <Link to={`/offers/details/${offer._id}/edit`}>
          <button className="button is-small is-link">Edit</button>
        </Link>
        <button className="button is-small is-dark ml-3">Delete</button>
      </div>
      <div className="content mt-5">
        <ReactTooltip place="top" type="dark" effect="float">
          {offerStatus.msg[offer.status]}
        </ReactTooltip>
        <p className="title is-4">
          <a data-tip="React-tooltip">
            <button
              className={`button button--status is-small mr-2 ${
                offerStatus.color[offer.status]
              }`}
            ></button>
          </a>
          {offer.company}
        </p>
        <p className="title is-4">
          <a href={offer.link} target="_blank" rel="noopener noreferrer">
            {offer.position}
          </a>
        </p>
        <p className="title is-5 mt-5">{offer.city}</p>
        <p> {offer.address}</p>
        <p className="title is-5 mt-5">Poziom:</p>
        <p>{offer.level}</p>
        <p className="title is-5 mt-5">Widełki:</p>
        <p>{offer.payScales}</p>
        <p className="title is-5 mt-5">Technologie:</p>
        <ul>
          {offer.techStack.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <p className="title is-5 mt-5">Opis:</p>
        {offer.description.map((el, index) => (
          <p key={index}>{el}</p>
        ))}
        <p className="title is-5 mt-5">Wymagania:</p>
        <ul>
          {offer.skills.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <p className="title is-5 mt-5">Mile widziane:</p>
        <ul>
          {offer.addSkills.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <p className="title is-5 mt-5">Oferta:</p>
        <ul>
          {offer.offer.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <p>{offer.deadline}</p>
        <p className="title is-5 mt-5">Uwagi:</p>
        <p>{offer.remarks}</p>
        <div>
          <Link to={`/offers/details/${offer._id}/edit`}>
            <button className="button is-small is-link">Edit</button>
          </Link>
          <button className="button is-small is-dark ml-3">Delete</button>
        </div>
      </div>
    </Layout>
  );
}
