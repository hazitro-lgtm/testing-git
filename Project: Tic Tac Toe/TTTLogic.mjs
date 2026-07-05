const Board = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9']
]

const GameTable = document.getElementById("GameTbl");
const Tiles = GameTable.querySelectorAll('td');
const RstBtn = document.getElementById("Reset");
const WinnerTab = document.getElementById("Result");

//Immediatly Invoked Function Expression(IIFE)
const Game = (() => {
    let GameState = 'going';
    let Move = 1;
    let Winner = 'none';

    function MakeMove(tile){
        if(tile.textContent != ' ' || GameState == 'finished'){
            return
        }
        const x = tile.dataset.x;
        const y = tile.dataset.y;
        const marker = Move % 2 == 1? "X" : "O";
        Board[x][y] = marker;
        tile.textContent = marker;
        CheckWinCon();
    }

    function CheckWinCon(){
        const diag1 = (Board[0][0] === Board[1][1] && Board[1][1] === Board[2][2]);
        const diag2 = (Board[2][0] === Board[1][1] && Board[1][1] === Board[0][2]);

        for(let a = 0; a < 3; a++){
            const row = (Board[a][0] === Board[a][1] && Board[a][1] === Board[a][2]);
            const col = (Board[0][a] === Board[1][a] && Board[1][a] === Board[2][a]);
            if(row || col || diag1 || diag2){
                GameState = 'finished';
                Winner = `Winner: ${Move % 2 == 1? "X" : "O"}`;
                WinnerTab.textContent = Winner;
                return
            }
        }

        if(Move >= 9){
            Winner = "Draw";
            GameState = 'finished';
            WinnerTab.textContent = Winner;
            return
        }
        Move++;
    }

    function GameReset(){
        GameState = 'going';
        Move = 1;
        Winner = 'none';
        WinnerTab.textContent = ' ';
        
        for(const tile of Tiles){
            tile.textContent = ' ';
        }

        let ix = 1;
        for(let row of Board){
            for(let a = 0; a < 3; a++){
                row[a] = ix;
                ix++;
            }
        }
    }

    return{GameState, Move, Winner, MakeMove, CheckWinCon, GameReset}
})();

for(const tile of Tiles){
    tile.addEventListener('click', () => Game.MakeMove(tile));
}
RstBtn.addEventListener('click', Game.GameReset);
