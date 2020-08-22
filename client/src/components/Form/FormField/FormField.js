import React from "react";

export default function FormField({
	label,
	name,
	placeholder,
	radios,
	value,
	radioValue,
	handleChange,
	tag: Tag,
}) {
	const control = (
		<Tag
			name={name}
			value={value}
			className={Tag}
			placeholder={placeholder}
			type={Tag === "input" ? "text" : null}
			onChange={handleChange}
		/>
	);

	const group = !radios ? (
		// input or textarea
		<>
			<label className="label label--custom">{label}</label>
			<div className="control">{control}</div>
		</>
	) : (
		// radio buttons group
		<>
			<p className="label label--custom">{label}</p>
			<div className="control">
				{radios.map((radio, index) => {
					return (
						<label className="radio radio--custom" key={index}>
							<input
								className="radio-button"
								type="radio"
								name={name}
								value={radio.value}
								checked={radioValue === radio.value}
								onChange={handleChange}
							/>
							{radio.label}
						</label>
					);
				})}
			</div>
		</>
	);

	return <div className="field">{group}</div>;
}
