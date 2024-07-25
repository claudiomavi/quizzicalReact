import React from "react";
import Home from "/src/Components/Home";
import Questions from "/src/Components/Questions";

export default function App() {
	const [showQuestions, setShowQuestions] = React.useState(false);

	function toggleButton() {
		return setShowQuestions(true);
	}

	function handlePlayAgain() {
		setShowQuestions(false);
	}

	return (
		<div>
			{showQuestions ? (
				<Questions onPlayAgain={handlePlayAgain} />
			) : (
				<Home handleClick={toggleButton} />
			)}
		</div>
	);
}
