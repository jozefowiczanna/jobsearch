import React, { Component } from "react";
import FormField from "./FormField/FormField";
import { fields } from "../../assets/data/jobOfferFormFields";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Modal from "../Modal/Modal";

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
	};

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
				this.setState({ values, loading: false });
			})
			.catch((err) => console.log(err));
	}

	handleChange = (e) => {
		const values = { ...this.state.values };
		values[e.target.name] = e.target.value;
		this.setState({ values });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.props.type === "Add") {
			axios.post("/api/offers", this.state.values).then((res) => {
				// redirect do strony z ogłoszeniem
			});
			return;
		}
		this.openModal();
	};

	openModal = () => {
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

		if (this.state.loading) {
			return <p>Offer is loading...</p>;
		}

		return (
			<>
				<form className="form form--custom" onSubmit={this.handleSubmit}>
					{formFields}
					<button className="button is-link mt-4">{this.props.type}</button>
				</form>
				<Modal
					closeModal={this.closeModal}
					isModalOpen={this.state.isModalOpen}
				/>
			</>
		);
	}
}
