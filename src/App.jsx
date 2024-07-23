// HACER QUE CUANDO SE PULSE EL BOTÓN EN HOME CON UN STATE APAREZCA EL COMPONENTE DE PREGUNTAS

import Home from "/src/Components/Home";
import Questions from "/src/Components/Questions";

export default function App() {
	const showQuestions = true;

	return <div>{showQuestions ? <Home /> : <Questions />}</div>;
}
