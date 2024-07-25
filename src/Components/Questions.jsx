import React, { useState, useEffect } from "react";
import { decode } from "html-entities";

export default function Questions({ onPlayAgain }) {
	const [dataArr, setDataArr] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [verifiedAnswers, setVerifiedAnswers] = useState({});
	const [isVerified, setIsVerified] = useState(false);
	const [score, setScore] = useState(0);

	useEffect(() => {
		fetchQuestions();
	}, []);

	const fetchQuestions = async () => {
		try {
			const res = await fetch(
				"https://opentdb.com/api.php?amount=5&type=multiple"
			);
			const data = await res.json();

			const transformedData = data.results.map((item, index) => {
				const allAnswers = [...item.incorrect_answers, item.correct_answer];
				const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

				return {
					id: index,
					question: decode(item.question),
					correct_answer: decode(item.correct_answer),
					answers: shuffledAnswers.map((answer) => decode(answer)),
				};
			});

			setDataArr(transformedData);
			setSelectedAnswers({});
			setVerifiedAnswers({});
			setIsVerified(false);
			setScore(0);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};

	const handleAnswerClick = (questionId, answerIndex) => {
		setSelectedAnswers((prev) => ({
			...prev,
			[questionId]: answerIndex,
		}));
	};

	const handleCheckAnswers = () => {
		if (isVerified) {
			fetchQuestions();
		} else {
			const newVerifiedAnswers = {};
			let newScore = 0;
			dataArr.forEach((item) => {
				const selectedAnswer = selectedAnswers[item.id];
				const correctAnswerIndex = item.answers.findIndex(
					(answer) => answer === item.correct_answer
				);
				newVerifiedAnswers[item.id] = {
					selected: selectedAnswer,
					correct: correctAnswerIndex,
				};
				if (selectedAnswer === correctAnswerIndex) {
					newScore += 1;
				}
			});
			setVerifiedAnswers(newVerifiedAnswers);
			setIsVerified(true);
			setScore(newScore);
		}
	};

	return (
		<div className="questions--container">
			{dataArr.map((item) => (
				<div key={item.id} className="question">
					<div>
						<p className="question--question">{item.question}</p>
						<div className="answers-container">
							{item.answers.map((answer, idx) => {
								const isSelected = selectedAnswers[item.id] === idx;
								const isCorrect = verifiedAnswers[item.id]?.correct === idx;
								const isWrongSelected =
									isSelected && !isCorrect && verifiedAnswers[item.id];

								let buttonClass = "";
								if (verifiedAnswers[item.id]) {
									buttonClass = isCorrect
										? "correct"
										: isWrongSelected
										? "wrong"
										: "";
								} else {
									buttonClass = isSelected ? "selected" : "";
								}

								return (
									<button
										key={idx}
										className={`question--button ${buttonClass}`}
										onClick={() => handleAnswerClick(item.id, idx)}
										disabled={!!verifiedAnswers[item.id]}>
										{answer}
									</button>
								);
							})}
						</div>
						<hr />
					</div>
				</div>
			))}
			<div className="results--container">
				{isVerified && (
					<p className="questions--result">
						You scored {score}/{dataArr.length} correct answers
					</p>
				)}

				{isVerified ? (
					<button className="question--check--button" onClick={onPlayAgain}>
						Play again
					</button>
				) : (
					<button
						className="question--check--button"
						onClick={handleCheckAnswers}>
						Check answers
					</button>
				)}
			</div>
		</div>
	);
}
