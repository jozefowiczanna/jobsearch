import React, { Component } from "react";
import FormField from "./FormField/FormField";
import { fields } from "../../assets/data/formData";
import axios from "axios";
import { AppContext } from "../../context";

export default class Form extends Component {
  state = {
    offer: {},
    loading: true,
  };

  static contextType = AppContext;

  componentDidMount() {
    const isEdit = this.props.location.pathname.includes("edit");
    if (isEdit) {
      // load offer data to the form
      axios
        .get(`/api/offers/${this.props.id}`)
        .then((res) => {
          const formValues = { ...this.context.state.formValues };
          Object.entries(res.data).forEach(([key, value]) => {
            if (formValues.hasOwnProperty(key)) {
              formValues[key] = value;
            }
          });
          this.context.setFormValues(formValues);
          this.setState({
            loading: false,
            offer: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { formValues } = this.context.state;
    const formFields = fields.map((field, index) => {
      const placeholder = field.placeholder ? field.placeholder : null;
      const radios = field.radios ? field.radios : null;
      const radioValue = field.radios ? formValues[field.name] : null;
      const required = field.hasOwnProperty("required") ? true : false;
      return (
        <FormField
          label={field.label}
          name={field.name}
          tag={field.tag}
          placeholder={placeholder}
          radios={radios}
          key={index}
          value={formValues[field.name]}
          radioValue={radioValue}
          required={required}
        />
      );
    });

    if (this.state.loading && this.props.type === "Edit") {
      return <p>Offer is loading...</p>;
    }

    return (
      <>
        <form
          className="form form--custom"
          onSubmit={(e) =>
            this.context.setActionType(e, this.props.type, this.props.id)
          }
        >
          <button type="submit" className="button is-link is-small mt-4">
            {this.props.type}
          </button>
          {formFields}
          <button type="submit" className="button is-link is-small mt-4">
            {this.props.type}
          </button>
        </form>
      </>
    );
  }
}
