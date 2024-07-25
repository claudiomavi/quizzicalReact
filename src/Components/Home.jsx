export default function Home(props) {
	return (
		<div className="home">
			<h4 className="home--title">Quizzical</h4>
			<p className="home--description">Let's see if you can answer this</p>
			<button className="home--button" onClick={props.handleClick}>
				Start quiz
			</button>
		</div>
	);
}
