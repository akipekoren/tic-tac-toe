       

var aiPlayer = -1;      //minPlayer
var humanPlayer = 1;    //maxPlayer
var BlankStatus = 0;

var turnCounter = 0;


var gameBoard = [BlankStatus, BlankStatus, BlankStatus,
                 BlankStatus, BlankStatus, BlankStatus,
                 BlankStatus, BlankStatus, BlankStatus ];



function checkBothConditions(currentState)
{
    return checkWin(currentState, aiPlayer) || checkWin(currentState, humanPlayer);
}




function checkWin(gameBoard, Player)
{

    if (gameBoard[0] == Player && gameBoard[1] == Player && gameBoard[2] == Player )
    {
        return Player;
    }

    else if (gameBoard[3] == Player && gameBoard[4] == Player && gameBoard[5] == Player)
    {
        return Player;
    }
 
    else if (gameBoard[6] == Player && gameBoard[7] == Player && gameBoard[8] == Player)
    {
        return Player;
    }
    else if (gameBoard[0] == Player && gameBoard[3] == Player && gameBoard[6] == Player)
    {
        return Player;
    }
    else if (gameBoard[1] == Player && gameBoard[4] == Player && gameBoard[7] == Player)
    {
        return Player;
    }
    else if (gameBoard[2] == Player && gameBoard[5] == Player && gameBoard[8] == Player)
    {
        return Player;
    }
    else if (gameBoard[0] == Player && gameBoard[4] == Player && gameBoard[8] == Player)
    {
        return Player;
    }
    else if (gameBoard[2] == Player && gameBoard[4] == Player && gameBoard[6] == Player)
    {
        return Player;
    }
    else{
        return 0;
    }
 
}


function heuristicFunctionCalculation(currentState)
{

    var score = 0;

    if (checkWin(currentState, aiPlayer))
    {
        score--;
    }
    else if (checkWin(currentState, humanPlayer)){
        score++;
    }
    else{

        score = 0;
    }

    return score;
}


function miniMax(curretState,emptyCell,player)
{
    var best;


    if (player == aiPlayer) {
		best = [-1, 99];
	}
	else {
		best = [-1, -99];
	}

    


    if ((emptyCell == 0)  || (checkBothConditions(curretState)))
    {

        var score = heuristicFunctionCalculation(curretState);
        
        return [-1,score];
    }



    for (var i = 0 ; i< 9 ; i++)
    {
        if (curretState[i] == 0 )
        {
        
            var cord = i;
            curretState[cord] = player;
            
            var score = miniMax(curretState,emptyCell -1, -player);
          
            curretState[cord] = 0;
            score[0] = cord;
          
            if (player == aiPlayer)
            {
                if (score[1] < best[1])
                {
               
                   best = score;
                }

            } 
            else{
             
                if (score[1] > best[1])
                {
                   
                    best = score;
                }
            
            }
        }

    }
    return best;


}



function getEmptyCell(gameBoard)
{
    var counter = 0;

    for (var i = 0; i< 9; i++)
    {
        if (gameBoard[i] == "")
        {
            counter++;
        }
    }


    return counter;
}




function aiPlayerMove()
{


    if (turnCounter == 9)
    {
        Outputmessage();                  
    }

    var cord;

    if (turnCounter == 0 )      // if AI starts the game, random 
    {
        cord = Math.floor(Math.random() * 9);       // random value between 0- 8

        var  newCell = document.getElementById(cord);
        gameBoard[cord] = aiPlayer;
        turnCounter++;
        newCell.innerHTML = "0";
    }
    else
    {

        var emptyCellCounter = getEmptyCell(gameBoard);
       

        cord = miniMax(gameBoard,emptyCellCounter, aiPlayer);
        var  newCell = document.getElementById(cord[0]);
        gameBoard[cord[0]] = aiPlayer;
        turnCounter++;
        if (turnCounter < 10)
        {
           
            newCell.innerHTML = "0";
        }
        if (turnCounter == 9)
        {
            Outputmessage();
        }
        

        
      
    }

    if (checkWin(gameBoard, aiPlayer) == -1)
    {
        Outputmessage();     
    }

}


function Outputmessage()
{

    var button = document.getElementById("bnt-ai");
	button.disabled = false;

    var aiResult = checkWin(gameBoard, aiPlayer);
    var humanResult = checkWin(gameBoard, humanPlayer);

    setTimeout(function(){

        if (aiResult == -1)
        {
            var  myValAi = document.getElementById("aiScore");
    
            myValAi.innerHTML = Number(myValAi.innerHTML) + 1;
       
            
            alert("Ai wins!");
        }
        else if (humanResult == 1)
        {
            var  myValHuman = document.getElementById("humanScore");
    
            myValHuman.innerHTML = Number(myValHuman.innerHTML) + 1;
  
            alert("You win!");
        }
        else{

            var  myValDraw = document.getElementById("drawScore");
    
            myValDraw.innerHTML = Number(myValDraw.innerHTML) + 1;

            alert("Draw!");
        }
      
        }, 100); 

}




function humanMove(index)
{   
    var myButton = document.getElementById("bnt-ai");
    myButton.disabled = true;

    if (turnCounter == 9)
    {
        Outputmessage();                      // No winner
    }

var element = document.getElementById(index.id);

if (element.innerHTML == "")
{
    index.innerHTML = "X";
    gameBoard[index.id] = humanPlayer;
    turnCounter++;

    var anyWinner = checkWin(gameBoard,humanPlayer);
    if (anyWinner == 0 )
    {
        
        aiPlayerMove();
    }
    
}

}


function refreshBoard(button)
{
    gameBoard = [BlankStatus, BlankStatus, BlankStatus,
                 BlankStatus, BlankStatus, BlankStatus,
                 BlankStatus, BlankStatus, BlankStatus ];

    turnCounter = 0;
    var myButton = document.getElementById("bnt-ai");
	myButton.disabled = false;

    var board;
    for (var i = 0; i< 9 ; i++)
    {
        board = document.getElementById(i);
        board.innerHTML = "";
        

    }


}


function LetAIToStart(button)
{
    refreshBoard(button);
    button.disabled = true;
    aiPlayerMove();
}

function ClearScoreboard()
{
    var  myValDraw = document.getElementById("drawScore");
    
    myValDraw.innerHTML = 0;

    var  myValHuman = document.getElementById("humanScore");
    
    myValHuman.innerHTML = 0;

    var  myValAi = document.getElementById("aiScore");
    
    myValAi.innerHTML = 0;

    refreshBoard();
}

