var WHITE_KING = 6;
var WHITE_QUEEN = 5;
var WHITE_ROOK = 4;
var WHITE_BISHOP = 3;
var WHITE_KNIGHT = 2;
var WHITE_PAWN = 1;
 
var BLACK_KING = -WHITE_KING;
var BLACK_QUEEN = -WHITE_QUEEN;
var BLACK_ROOK = -WHITE_ROOK;
var BLACK_BISHOP = -WHITE_BISHOP;
var BLACK_KNIGHT = -WHITE_KNIGHT;
var BLACK_PAWN = -WHITE_PAWN;

var board = [[BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
             [BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
             [WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK]];

var click_count=0;
var from=[],to=[];
var oldtarget,newtarget;

function drawBoard(board){                          //to draw the board
    var str = '';
    for( var i = 0 ; i < 8 ; i++ ){
        str += '<div class="row">';
        for( var j = 0 ; j < 8 ; j++ ){
            str += '<div class="column ' +
            ( (i + j) % 2 === 0 ? 'light': 'dark') + '">' +
            '<div class="' + getPieceName(board[i][j]) +'" data-piece="' + getPieceName(board[i][j]) + 
            '" data-row="' + i + '" data-column="'+j+'"></div>' +               //properties of the div
            '</div>';
        }
        str += '</div>';
    }
    $('#board').append(str);
}             


function getPieceName(pieceValue){
    switch (pieceValue) {
        case WHITE_KING:
            return 'WHITE_KING';
            break;
        case WHITE_QUEEN:
            return 'WHITE_QUEEN';
            break;
        case WHITE_ROOK:
            return 'WHITE_ROOK';
            break;
        case WHITE_BISHOP:
            return 'WHITE_BISHOP';
            break;
        case WHITE_KNIGHT:
            return 'WHITE_KNIGHT';
            break;
        case WHITE_PAWN:
            return 'WHITE_PAWN';
            break;
        
        case BLACK_KING:
            return 'BLACK_KING';
            break;
        case BLACK_QUEEN:
            return 'BLACK_QUEEN';
            break;
        case BLACK_ROOK:
            return 'BLACK_ROOK';
            break;
        case BLACK_BISHOP:
            return 'BLACK_BISHOP';
            break;
        case BLACK_KNIGHT:
            return 'BLACK_KNIGHT';
            break;
        case BLACK_PAWN:
            return 'BLACK_PAWN';
            break;
        
        default:
            return 'EMPTY';
            break;
    }
}


$(document).ready(function()
{                   
	drawBoard(board);
	$('#board').click(function()                           
    {
        move_init(board);

    });
});  

function move_init(board)                                   //to move the corresponding clicked pieces 
{

          var target,row_index,column_index,piece;          
          target = $(event.target);
          target.addClass("divborder");
          row_index=target.data("row");
          column_index=target.data("column");
          piece=target.data("piece");
          
          if(click_count===0)
          {  
            var str1='row = '+row_index+'    column= '+ column_index + "   piece = " + piece;
            $("#details").html(str1);
            from[0]=row_index;
            from[1]=column_index;
            click_count=1;
            oldtarget=target;
            newtarget.removeClass("divborder");
          } 
          else if(click_count===1)
          {
            to[0]=row_index;
            to[1]=column_index;
            validate_move(from,to,piece);                           //to validate move
            click_count=0;
            newtarget=target;
            oldtarget.removeClass("divborder");
            $("#board").html(" ");
            drawBoard(board);

            //target.removeClass("divborder");
          }
}

function validate_move(from,to,piece)
{
    var str="from=" + from[0] +"  "+from[1]+"to="+to[0]+to[1];
    $("#details").html(str);
    change(from,to,piece);                                              //to change the board if move is valid
}

function change(from,to,piece)
{
    board[to[0]][to[1]]=board[from[0]][from[1]];
    board[from[0]][from[1]]=0;
    var str="board="+board[to[0]][to[1]];
    $("#details").html(str);
    var str1;
}