export default function Questions() {
	return (
		<div className="question">
			<p className="question--question">
				How would one say goodbye in Spanish?
			</p>
			<div>
				<button>Adiós</button>
				<button>Hola</button>
				<button>Au Revoir</button>
				<button>Salir</button>
			</div>
			<hr />
			<button className="question--button">Check answers</button>
		</div>
	);
}
