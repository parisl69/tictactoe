import '../scss/main.scss'
import Game from './Game.js'

$(() => {
	let game = new Game()
	game.playGame()

	$(document).on('click', '#play-again-button', () => {
		game.initialize()
		game.playGame()
	})
})
