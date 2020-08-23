import React from "react";
import Layout from "../components/Layout/Layout";
import Table from "../components/Table/Table";

export default function OffersPage() {
	return (
		<Layout>
			<h1 className="title is-3">Job search</h1>
			<h2 className="title is-4">Oferty</h2>
			<Table />
		</Layout>
	);
}
