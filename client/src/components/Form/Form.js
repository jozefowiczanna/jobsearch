import React, { Component } from "react";
import FormField from "./FormField/FormField";
import { fields } from "../../assets/data/jobOfferFormFields";

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
			additionalSkills: "",
			offer: "",
			payScales: "",
			deadline: "",
			remarks: "",
			level: "junior",
			status: "notSent",
		},
	};

	handleChange = (e) => {
		const values = { ...this.state.values };
		values[e.target.name] = e.target.value;
		this.setState({ values });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.values);
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

		return (
			<form className="form form--custom" onSubmit={this.handleSubmit}>
				{formFields}
				<button className="button is-link mt-4">{this.props.type}</button>
			</form>
		);
	}
}
