import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import OffersPage from "./views/OffersPage";
import FormPage from "./views/FormPage";
import DetailsPage from "./views/DetailsPage";
import { routes } from "./routes";
import { AppContext } from "./context";
import axios from "axios";
import Modal from "./components/Modal/Modal";
import { initFormValues } from "./assets/data/formData";

export default class App extends Component {
  state = {
    offers: [],
    offersLoading: true,
    isNavOpen: false,
    isModalOpen: false,
    actionType: null,
    offerId: null,
    redirect: null,
    formValues: { ...initFormValues },
  };

  componentDidMount() {
    this.getAllOffers();
  }

  componentDidUpdate() {
    if (this.state.redirect === "/") {
      this.resetRedirect();
    }
  }

  toggleNav = () => {
    this.setState((prevState) => ({ isNavOpen: !prevState.isNavOpen }));
  };

  closeNav = () => {
    this.setState({ isNavOpen: false });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModalAndCancelAction = () => {
    this.setState({ isModalOpen: false, actionType: null, offerId: null });
  };

  getAllOffers = () => {
    axios
      .get("/api/offers")
      .then((res) => {
        this.setState({
          offers: res.data,
          offersLoading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  setActionType = (e, type, id = null) => {
    e.preventDefault();
    this.setState({
      actionType: type,
      offerId: id,
    });
    this.openModal();
  };

  addOffer = (e) => {
    this.closeModalAndCancelAction();
    console.log("post", this.state.formValues);
    axios
      .post("/api/offers", this.state.formValues)
      .then((res) => {
        console.log(res.data);
        const offers = [{ ...res.data }, ...this.state.offers];
        this.setState({
          redirect: `/offers/details/${res.data._id}`,
          formValues: { ...initFormValues },
          offers,
        });
      })
      .catch((err) => console.log(err));
  };

  editOffer = (e) => {
    this.closeModalAndCancelAction();
    const offer = { ...this.state.offer };
    const updatedOffer = {};
    // prepare object containing only changed values
    Object.entries(this.state.formValues).forEach(([key, value]) => {
      const val = value.trim();
      if (val !== offer[key]) {
        updatedOffer[key] = val;
      }
    });
    // if none of the values have been changed, don't send request
    if (Object.keys(updatedOffer).length === 0) {
      return;
    }

    axios
      .put(`/api/offers/${this.state.offerId}`, updatedOffer)
      .then((res) => {
        // find and update offer;
        const offers = [...this.state.offers];
        const index = offers.findIndex((offer) => offer._id === res.data._id);
        offers[index] = { ...res.data };
        this.setState({
          redirect: `/offers/details/${res.data._id}`,
          formValues: { ...initFormValues },
          offers,
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    const formValues = { ...this.state.formValues };
    formValues[e.target.name] = e.target.value;
    this.setState({ formValues });
  };

  setFormValues = (formValues) => {
    this.setState({ formValues });
  };

  resetRedirect = () => {
    this.setState({
      redirect: null,
    });
  };

  deleteOffer = () => {
    axios
      .delete(`/api/offers/${this.state.offerId}`)
      .then((res) => {
        const offers = [...this.state.offers].filter(
          (offer) => offer._id !== this.state.offerId
        );
        this.setState({
          redirect: "/",
          isModalOpen: false,
          offers,
          offerId: null,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const contextValue = {
      state: { ...this.state },
      offers: this.state.offers,
      toggleNav: this.toggleNav,
      closeNav: this.closeNav,
      getAllOffers: this.getAllOffers,
      openModal: this.openModal,
      setActionType: this.setActionType,
      handleChange: this.handleChange,
      setFormValues: this.setFormValues,
      resetRedirect: this.resetRedirect,
    };

    return (
      <AppContext.Provider value={contextValue}>
        <Router>
          {this.state.redirect && <Redirect to={this.state.redirect} />}
          <Route
            exact
            path="/"
            render={() => <Redirect to={routes.offers} />}
          />
          <Route
            exact
            path={routes.offers}
            render={(props) => <OffersPage {...props} />}
          />
          <Route
            exact
            path={routes.offer}
            render={(props) => <DetailsPage {...props} />}
          />
          <Route
            exact
            path={routes.addOffer}
            render={(props) => <FormPage {...props} />}
          />
          <Route
            exact
            path={routes.editOffer}
            render={(props) => <FormPage {...props} />}
          />
          <Modal
            closeModalAndCancelAction={this.closeModalAndCancelAction}
            isModalOpen={this.state.isModalOpen}
            addOffer={this.addOffer}
            editOffer={this.editOffer}
            actionType={this.state.actionType}
            deleteOffer={this.deleteOffer}
          />
        </Router>
      </AppContext.Provider>
    );
  }
}
