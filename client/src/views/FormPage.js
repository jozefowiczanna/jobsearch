import React from "react";
import Layout from "../components/Layout/Layout";
import Form from "../components/Form/Form";

export default function FormPage(props) {
  let path = "/";
  let id = null;

  if (props.location.pathname.includes("add")) {
    path = "add";
  }
  if (props.location.pathname.includes("edit")) {
    path = "edit";
    id = props.location.pathname.split("/")[3];
  }

  const type = path === "add" ? "Add" : "Edit";

  return (
    <Layout>
      <h2>{type}</h2>
      <Form
        type={type}
        id={id}
        history={props.history}
        location={props.location}
      />
    </Layout>
  );
}
