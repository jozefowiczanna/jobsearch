import React from "react";
import Layout from "../components/Layout/Layout";
import Form from "../components/Form/Form";

export default function FormPage(props) {
	console.log(props.location);
	let path = "/";
	if (props.location.pathname.includes("add")) {
		path = "add";
	}
	if (props.location.pathname.includes("edit")) {
		path = "edit";
	}

	const type = path === "add" ? "Add" : "Edit";

	return (
		<Layout>
			<h2>{type}</h2>
			<Form type={type} />
		</Layout>
	);
}
