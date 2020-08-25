import React, { Component } from "react";
import FormField from "./FormField/FormField";
import { fields } from "../../assets/data/jobOfferFormFields";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Modal from "../Modal/Modal";
import { AppContext } from "../../context";

export default class Form extends Component {
  state = {
    values: {
      company: "",
      position: "",
      link: "",
      city: "",
      address: "",
      techStack: "",
      description: "",
      skills: "",
      addSkills: "",
      offer: "",
      payScales: "",
      deadline: "",
      remarks: "",
      level: "junior",
      status: "notSent",
    },
    offer: {},
    loading: true,
    isModalOpen: false,
    redirect: false,
  };

  static contextType = AppContext;

  componentDidMount() {
    if (this.props.type === "Add") return;
    axios
      .get(`/api/offers/${this.props.id}`)
      .then((res) => {
        const values = { ...this.state.values };
        Object.entries(res.data).forEach(([key, value]) => {
          if (values.hasOwnProperty(key)) {
            values[key] = value;
          }
        });
        this.setState({
          values,
          loading: false,
          offer: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleChange = (e) => {
    const values = { ...this.state.values };
    values[e.target.name] = e.target.value;
    this.setState({ values });
  };

  handleSubmit = (e) => {
    this.closeModal();
    if (this.props.type === "Add") {
      axios
        .post("/api/offers", this.state.values)
        .then((res) => {
          this.context.getAllOffers();
          this.props.history.push(`/offers/details/${res.data._id}`);
        })
        .catch((err) => console.log(err));
      return;
    }

    const offer = { ...this.state.offer };
    const updatedOffer = {};
    Object.entries(this.state.values).forEach(([key, value]) => {
      const val = value.trim();
      if (val !== offer[key]) {
        updatedOffer[key] = val;
      }
    });
    if (Object.keys(updatedOffer).length === 0) {
      console.log("test");
      return;
    }
    console.log("updated");

    axios
      .put(`/api/offers/${this.props.id}`, updatedOffer)
      .then((res) => {
        // this.props.location.state = { offer: res.data };
        this.context.getAllOffers();
        this.props.history.push({
          pathname: `/offers/details/${res.data._id}`,
          state: { offer: res.data },
        });

        // this.setState({ redirect: true });
      })
      .catch((err) => console.log(err));
  };

  openModal = (e) => {
    e.preventDefault(); // for submit button
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const formFields = fields.map((field, index) => {
      const placeholder = field.placeholder ? field.placeholder : null;
      const radios = field.radios ? field.radios : null;
      const radioValue = field.radios ? this.state.values[field.name] : null;
      return (
        <FormField
          label={field.label}
          name={field.name}
          tag={field.tag}
          placeholder={placeholder}
          radios={radios}
          key={index}
          value={this.state.values[field.name]}
          handleChange={this.handleChange}
          radioValue={radioValue}
        />
      );
    });

    if (this.state.loading && this.props.type === "Edit") {
      return <p>Offer is loading...</p>;
    }

    return (
      <>
        <form className="form form--custom" onSubmit={this.openModal}>
          <button type="submit" className="button is-link is-small mt-4">
            {this.props.type}
          </button>
          {formFields}
          <button type="submit" className="button is-link is-small mt-4">
            {this.props.type}
          </button>
        </form>
        <Modal
          closeModal={this.closeModal}
          isModalOpen={this.state.isModalOpen}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}
