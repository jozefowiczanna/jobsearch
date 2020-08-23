import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import OffersPage from "./views/OffersPage";
import FormPage from "./views/FormPage";
import DetailsPage from "./views/DetailsPage";
import { routes } from "./routes";
import { AppContext } from "./context";
import axios from "axios";

export default class App extends Component {
	state = {
		offers: [],
		offersLoading: true,
		isNavOpen: false,
	};

	componentDidMount() {
		this.getAllOffers();
	}

	toggleNav = () => {
		this.setState((prevState) => ({ isNavOpen: !prevState.isNavOpen }));
	};

	closeNav = () => {
		this.setState({ isNavOpen: false });
	};

	getAllOffers = () => {
		axios
			.get("/api/offers")
			.then((res) => {
				console.log(res.data);
				this.setState({
					offers: res.data,
					offersLoading: false,
				});
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { toggleNav, closeNav } = this;
		const contextValue = {
			state: { ...this.state },
			toggleNav,
			closeNav,
		};

		return (
			<AppContext.Provider value={contextValue}>
				<Router>
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
				</Router>
			</AppContext.Provider>
		);
	}
}
