import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";
import ReactTooltip from "react-tooltip";
import offerStatus from "../../assets/data/offerStatus";

export default function Table() {
	const context = useContext(AppContext);

	if (context.state.offersLoading) {
		return <p>Offers loading...</p>;
	}

	return (
		<table className="table is-hoverable table--custom">
			<thead>
				<tr>
					<th>St</th>
					<th>Lvl</th>
					<th>Firma</th>
					<th>Stanowisko</th>
					<th>Technologie</th>
					<th>Deadline</th>
				</tr>
			</thead>
			<tbody>
				{context.state.offers.map((offer) => {
					return (
						<tr key={offer._id}>
							<td>
								<a data-tip="React-tooltip">
									<button
										className={`button button--status is-small ${
											offerStatus.color[offer.status]
										}`}
									></button>
								</a>
								<ReactTooltip place="top" type="dark" effect="float">
									{offerStatus.msg[offer.status]}
								</ReactTooltip>
							</td>
							<td className="vcenter">
								<span className={`circle ${offer.level}`} />
							</td>
							<td>{offer.company}</td>
							<td>
								<Link to={`/offers/details/${offer._id}`}>
									{offer.position}
								</Link>
							</td>
							<td>{offer.techStack}</td>
							<td>{offer.deadline}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
