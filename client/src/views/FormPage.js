import React from "react";
import Layout from "../components/Layout/Layout";

export default function FormPage(props) {
  console.log(props.location);
  let path = "/";
  if (props.location.pathname.includes("add")) {
    path = "add";
  }
  if (props.location.pathname.includes("edit")) {
    path = "edit";
  }

  const title = path === "add" ? "Add" : "Edit";

  return (
    <Layout>
      <h2>{title}</h2>
    </Layout>
  );
}
