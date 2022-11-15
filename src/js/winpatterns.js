/**
 * First two numbers repsesent the indices of a player's already marked cells
 * Third number (if empty on board) represents the index of play in order to either prevent or achieve win
 * The board is a one dimension array
 *  0 1 2
 *  3 4 5
 *  6 7 8
 * So, for example if cells 0 and 3 are already marked for a a player and cell 6 is empty then..
 * Player's Opponent plays on 6 in order to prevent player win
 * Player himself plays 6 in order to achieve win
 */

const winPatterns = [
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 0],
	[4, 7, 1],
	[5, 8, 2],
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[1, 2, 0],
	[4, 5, 3],
	[7, 8, 6],
	[0, 2, 1],
	[3, 5, 4],
	[6, 8, 7],
	[0, 6, 3],
	[1, 7, 4],
	[2, 8, 5],
	[0, 2, 1],
	[3, 5, 4],
	[6, 8, 7],
	[0, 8, 4],
	[2, 6, 4],
	[2, 4, 6],
	[4, 6, 2],
	[0, 4, 8],
	[4, 8, 0],
]

export { winPatterns }
