import React from "react";
import Home from "/src/Components/Home";
import Questions from "/src/Components/Questions";

export default function App() {
	const [showQuestions, setShowQuestions] = React.useState(false);

	function toggleButton() {
		return setShowQuestions(false); // volver a ponerlo en true cuando acabes para que salga la home
	}

	return (
		<div>
			{showQuestions ? <Questions /> : <Home handleClick={toggleButton} />}
		</div>
	);
}
