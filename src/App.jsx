import React from "react";
import Home from "/src/Components/Home";
import Questions from "/src/Components/Questions";

export default function App() {
	const [showQuestions, setShowQuestions] = React.useState(true); // volver a ponerlo en false cuando acabes para que salga la home

	function toggleButton() {
		return setShowQuestions(true);
	}

	return (
		<div>
			{showQuestions ? <Questions /> : <Home handleClick={toggleButton} />}
		</div>
	);
}
