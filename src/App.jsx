// PULL 5 QUESTIONS FROM THE OTDB API

// VER COMO USAR CORRECTAMENTE ENCODE

// LIMIT THE CHOICE TO 1
// VER COMO HACER TRACKING DE LAS ID DE LOS BOTONES DE RESPUESTAS PARA QUE SE SELECCIONE SOLO 1
//   CLASE DE SCRIMBA QUE PODRÍA AYUDAR --> https://v2.scrimba.com/learn-react-c0e/~05a / https://v2.scrimba.com/learn-react-c0e/~05b / https://v2.scrimba.com/learn-react-c0e/~05c
//   AQUÍ EXPLICA COMO CON EL ISHELD PODEMOS SABER CUAL SE HA SELECCIONADO

import React from "react";
import Home from "/src/Components/Home";
import Questions from "/src/Components/Questions";
import { encode } from "html-entities";

export default function App() {
	encode("< > \" ' & © ∆");

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
