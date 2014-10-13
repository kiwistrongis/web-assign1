//global vars
var done = false;
var chars = [ 'X', 'O'];
var board_data = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
var turn = 1;

//give the players a message
function put_message( data){
	var message = document.getElementById( "message");
	message.innerHTML = data;}

//try to make a move
function move( i){
	//do nothing if game is over
	if( done) return;

	//check if move is valid
	if( ! check_move( i)){
		put_message( "illegal move");
		return;}

	//make a move
	place_move( i);

	//check for a winner
	var winner = check_win();
	if( winner){
		put_message( "player '" + get_player( winner) + "' wins");
		done = true;
		return;}

	if( check_draw()){
		put_message( "nobody wins, you all suck");
		done = true;
		return;}
	
	//update stuff
	inc_turn();
	put_message( "player '" + get_player( turn) + "'s turn");}

//check if a move is valid
function check_move( i){
	return board_data[i] == 0;}

//check if we are in a win condition
// and return the winner
function check_win(){
	//check lines through center
	var center = board_data[4];
	if( ( board_data[0] == center && board_data[8] == center) ||
			( board_data[1] == center && board_data[7] == center) ||
			( board_data[2] == center && board_data[6] == center) ||
			( board_data[3] == center && board_data[5] == center))
		return center;
	//check side lines
	var top_left = board_data[0];
	if( ( board_data[1] == top_left && board_data[2] == top_left) ||
			( board_data[3] == top_left && board_data[6] == top_left))
		return top_left;
	var bot_right = board_data[8];
	if( ( board_data[6] == bot_right && board_data[7] == bot_right) ||
			( board_data[2] == bot_right && board_data[5] == bot_right))
		return bot_right;
	//no winner
	return false;}

function check_draw(){
	for( i = 0; i < 9; i++)
		if( board_data[i] == 0){
			console.log( i);
			return false;}
	return true;}

function place_move( i){
	//get cell
	var cell_id = "cell" + i;
	var cell = document.getElementById( cell_id);

	//check cell
	if( cell == null){
		put_message( "error, cell was null: " + cell_id);
		return;}

	//set cell data
	board_data[ i] = turn;
	cell.innerHTML = get_player( turn);}

//increment the turn global var
function inc_turn(){
	turn = - turn}

//get the character associated with the given turn int
function get_player( turn){
	switch( turn){
		case 1: return chars[1];
		case -1: return chars[0];
		default: return null;}}

//reset the game
function reset_board(){
	done = false;
	board_data = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
	turn = 1;
	reset_cells();
	put_message( "player '" + get_player( turn) + "' goes first");}

//reset every cell
function reset_cells(){
	for( i = 0; i < 9; i++){
		var cell_id = "cell" + i;
		var cell = document.getElementById( cell_id);
		cell.innerHTML = "";}}

