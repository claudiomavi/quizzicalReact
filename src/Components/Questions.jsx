import React from "react";

export default function Questions() {
	const [dataArr, setDataArr] = React.useState([]);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(
					"https://opentdb.com/api.php?amount=5&type=multiple"
				);
				const data = await res.json();

				// Transformamos los datos
				const transformedData = data.results.map((item) => {
					const allAnswers = [...item.incorrect_answers, item.correct_answer];
					const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

					return {
						question: item.question,
						correct_answer: item.correct_answer,
						answers: shuffledAnswers,
					};
				});

				setDataArr(transformedData);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="questions--container">
			{dataArr.map((item, index) => (
				<div key={index} className="question">
					<div>
						<p className="question--question">{item.question}</p>
						<div className="answers-container">
							{item.answers.map((answer, idx) => (
								<button key={idx} className="question--button">
									{answer}
								</button>
							))}
						</div>
						<hr />
					</div>
				</div>
			))}
			<button className="question--check--button">Check answers</button>
		</div>
	);
}
