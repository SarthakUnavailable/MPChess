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


var click_count=0,move_count=0;
var from=[],to=[];
var oldtarget,newtarget;

function drawBoard(board){ //to draw the board
    var str = '';
    for( var i = 0 ; i < 8 ; i++ ){
        str += '<div class="row">';
        for( var j = 0 ; j < 8 ; j++ ){
            str += '<div class="column ' +
            ( (i + j) % 2 === 0 ? 'light': 'dark') + '">' +
            '<div class="' + getPieceName(board[i][j]) +'" data-piece="' + getPieceName(board[i][j]) +
            '" data-row="' + i + '" data-column="'+j+'"></div>' + //properties of the div
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

function move_init(board) //to move the corresponding clicked pieces
{

          var target,row_index,column_index,piece;
          target = $(event.target);
          target.addClass("divborder");
          row_index=target.data("row");
          column_index=target.data("column");
          
          if(click_count===0)
          {
            piece=target.data("piece");
            var str1='row = '+row_index+' column= '+ column_index + " piece = " + piece;
            $("#details").html(str1);
            from[0]=row_index;
            from[1]=column_index;
            if((board[row_index][column_index]>0 && move_count%2===0) || (board[row_index][column_index]<0 && move_count%2===1))     
            {  //only if piece is clicked, do this (from position)
              click_count=1;
              oldtarget=target;
              newtarget.removeClass("divborder");
            }
          }
          else if(click_count===1)          //second click,i.e, to position
          {
            to[0]=row_index;
            to[1]=column_index;
            validate_move(from,to,oldtarget.data("piece")); //to validate move. oldtarget's piece cuz new target will be empty space
            click_count=0;
            newtarget=target;
            oldtarget.removeClass("divborder");
            $("#board").html(" ");
            $("#turn").html(move_count%2);
            drawBoard(board);
            //target.removeClass("divborder");
          }
}

function validate_piece(from,to,piece)                                      //Also we shoukd check for the presence of any other piece in the way.. Too lazy now
{
  $("#boarddetails").html(" ");
  var row_diff,column_diff;
  row_diff=Math.abs(to[0]-from[0]);
  column_diff=Math.abs(to[1]-from[1]);
  switch (piece) 
    {
        case 'WHITE_KING':
        case 'BLACK_KING':
            if((row_diff===0 || row_diff===1) && (column_diff===0 || column_diff===1))
              return 1;
            else  
              return 0;
            break;
        case 'WHITE_QUEEN':
        case 'BLACK_QUEEN':
            if((row_diff===column_diff || to[0]===from[0] || to[1]===from[1]) && isPathValid(from,to,piece))
              return 1;
            else
              return 0;
            break;
        case 'WHITE_ROOK':
        case 'BLACK_ROOK':  
            if((to[0]===from[0] || to[1]===from[1]) && isPathValid(from,to,piece))                      //only horizontal/vertical movement
              return 1;
            else
              return 0;
            break;
        case 'WHITE_BISHOP':
        case 'BLACK_BISHOP':
            if((row_diff===column_diff) && isPathValid(from,to,piece))     //only diagonal movement
                return 1;
            else 
                return 0;
            break;
        case 'WHITE_KNIGHT':
        case 'BLACK_KNIGHT':
            if((row_diff===2 && column_diff===1) || (row_diff===1 && column_diff===2))
                return 1;       //if row diff=2 & column diff=1 or row diff=1 & column diff=2
            else
                return 0;
            break;
        case 'WHITE_PAWN':
            //$("#boarddetails").html("Donno why");
            if(to[0]-from[0]<0)                                                         //Pawn moves forward
            {
                if(from[0]===6 && from[0]-to[0]<=2)                                     //First move of a pawn
                {
                    if(to[1]===from[1] && board[to[0]][to[1]]===0)     
                        return 1;
                    else if((column_diff===1) && board[to[0]][to[1]]!=0)     //Diagonal kill, !=0 cuz >0 condn already checked in validate_move
                        return 1;                                                        //there's a black piece present
                    else
                        return 0;
                }
                else if(to[0]-from[0]===-1)                                             //Anything but the first move
                {
                    if(to[1]===from[1] && board[to[0]][to[1]]===0)                      //if same column and empty space,move
                        return 1;
                    else if((column_diff===1) && board[to[0]][to[1]]!=0)    //Kill
                        return 1;
                    else
                        return 0;
                }
                else                                                                    //any other condn => false
                    return 0;
            }
            else                                                                        //if pawn to move backwards => false
                return 0;
            
            break;

        case 'BLACK_PAWN':
            //have to change it back to white pawn later cuz in multiplayer view, even 2nd player will have his black pieces at the bottom in the beginning
            if(to[0]-from[0]>0)                                                         //Black Pawn moves forward
            {
                if(from[0]===1 && to[0]-from[0]<=2)                                     //First move of a pawn
                {
                    if(to[1]===from[1] && board[to[0]][to[1]]===0)
                        return 1;
                    else if((column_diff===1) && board[to[0]][to[1]]!=0)     //Diagonal if 
                        return 1;                                                        //there's a white piece present
                    else
                        return 0;
                }
                else if(to[0]-from[0]===1)                                             //Anything but the first move
                {
                    if(to[1]===from[1] && board[to[0]][to[1]]===0)                      //if same column and empty space,move
                        return 1;
                    else if((column_diff===1) && board[to[0]][to[1]]!=0)    //Kill
                        return 1;
                    else
                        return 0;
                }
                else                                                                    //any other condn => false
                    return 0;
            }
            else                                                                        //if pawn to move backwards => false
                return 0;
            break;
        
        default: $("#boarddetails").html("Dafuq");

            return 0;
            break;
    } 
}

function validate_move(from,to,piece)                              //to validate move
{
  var str="from=" + from[0] +"  "+from[1]+" to="+to[0]+" "+to[1];
  $("#details").html(str);
  if((board[to[0]][to[1]]*board[from[0]][from[1]])>0)
    return 0;
  if(validate_piece(from,to,piece) === 1)
    change(from,to,piece);

//  else
//    $("#details").html("Problem");
}

function change(from,to,piece)
{
    board[to[0]][to[1]]=board[from[0]][from[1]];
    board[from[0]][from[1]]=0;
    move_count++;
    var str="board="+board[to[0]][to[1]];
    $("#details").html(str);
    var str1;
}

function isPathValid(from,to,piece)
{
    var row_diff,column_diff;
    var direction;
    var i=-1,j=-1,incr_j,incr_i;
    row_diff=to[0]-from[0];
    column_diff=to[1]-from[1];
    if(row_diff<0)                          //positive direction, i.e, upwards
    {
        i=from[0]-1;
        if(column_diff===0)                 //vertical upwards
        {
            j=from[1];                 board[i][j]
            incr_j=0;
        }
        else if(column_diff>0)              //right diagonal upwards
        {   
            j=from[1] + 1;
            incr_j=1;
        }
        else                                //left diagonal upwards
        {  
            j=from[1] - 1;                      //j is for column
            incr_j=-1;                            
        }
    }
    else if(row_diff>0)                     //negative direction
    {
        i=from[0]+1;
        if(column_diff===0)                 //vertical downwards
        {  
            j=from[1];
            incr_j=0;
        }
        else if(column_diff>0)              //left diagonal downwards
        {
            j=from[1]+1;
            incr_j=1;
        }
        else             //right diagonal downwards
        {
            j=from[1]-1;
            incr_j=-1;
        }
    }
   else                                 //row_diff=0 => horizontal movement
    {
        i=from[0];
        if(column_diff>0)               //horizontal right
        {
            j=from[1]+1;
            incr_j=1;
        }
        else                            //horizontal left
        {
            j=from[1]-1;
            incr_j=-1;
        }

    }


    if(row_diff<0)
    {
        while(i>to[0])
        {
            if(board[i][j])
            {
                $("#boarddetails").html("Invalid move. i= "+i+" j= "+ j);
                return false;
            }
            i--;
            j+=incr_j;
        }
    }
    else if(row_diff>0)
    {
        while(i<to[0])
        {
            if(board[i][j])
            {
                $("#boarddetails").html("Invalid move. i= "+i+" j= "+ j);
                return false;
            }
            i++;
            j+=incr_j;
        }
    }
    else                                            //horizontal
    {
    
    }
    //else
    //{
    //    while(j>)
    //}
    


    return true;
}