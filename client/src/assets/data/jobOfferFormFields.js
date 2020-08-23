export const fields = [
	{
		label: "Status aplikacji",
		name: "status",
		tag: "radio",
		radios: [
			{
				label: "Nie wysłane",
				name: "status",
				value: "notSent",
			},
			{
				label: "Do wysłania",
				name: "status",
				value: "toBeSent",
			},
			{
				label: "Wysłane",
				name: "status",
				value: "sent",
			},
			{
				label: "Odrzucone",
				name: "status",
				value: "rejected",
			},
		],
	},
	{
		label: "Nazwa firmy",
		name: "company",
		tag: "input",
	},
	{
		label: "Nazwa stanowiska",
		name: "position",
		tag: "input",
	},
	{
		label: "Poziom",
		name: "level",
		tag: "radio",
		radios: [
			{
				label: "Junior",
				name: "level",
				value: "junior",
			},
			{
				label: "Mid",
				name: "level",
				value: "mid",
			},
			{
				label: "Senior",
				name: "level",
				value: "senior",
			},
		],
	},
	{
		label: "Link do ogłoszenia",
		name: "link",
		tag: "input",
	},
	{
		label: "Miasto",
		name: "city",
		tag: "input",
	},
	{
		label: "Adres",
		name: "address",
		tag: "input",
	},
	{
		label: "Wymagane technologie",
		name: "techStack",
		tag: "textarea",
		placeholder:
			"Oddziel enterem, możesz określić stopień, np. 'JavaScript 3/5, React 1/5'",
	},
	{
		label: "Opis",
		name: "description",
		tag: "textarea",
	},
	{
		label: "Wymagania",
		name: "skills",
		tag: "textarea",
	},
	{
		label: "Mile widziane",
		name: "addSkills",
		tag: "textarea",
	},
	{
		label: "Oferta",
		name: "offer",
		tag: "textarea",
	},
	{
		label: "Zarobki",
		name: "payScales",
		tag: "input",
		placeholder:
			"'3000 - 5000' lub, gdy brak drugiej wartości: 'od 3000' lub 'do 5000'",
	},
	{
		label: "Data zakończenia zbierania ogłoszeń",
		name: "deadline",
		tag: "input", // date? calendar?
	},
	{
		label: "Uwagi",
		name: "remarks",
		tag: "textarea",
	},
];
