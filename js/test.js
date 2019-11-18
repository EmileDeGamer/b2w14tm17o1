var scoreCard = [
    [1,true,true,1,true],
    [true,true,1,true,true],
    [true,1,true,1,true],
    [1,true,1,true,true],
    [1,1,1,1,true]
];

var win = false;
var columnWin = [];
var diagonaalWin = [true, true];

for (var i = 0; i < scoreCard.length;i++)
{
    var rowWin = true;
    for (var j = 0; j < scoreCard[i].length;j++){
        if (columnWin[j] === undefined) {
            columnWin[j] = null;
        }
        if (scoreCard[i][i] !== true) {
            diagonaalWin[0]= false;
        }
        if (scoreCard[i][scoreCard[i].length- 1 - i] !== true) 
        {
            diagonaalWin[1]= false;
        }
        if (scoreCard[i][j] !== true) {
            rowWin = false;
            columnWin[j] = false;
        } 
        else if (columnWin[j] !== false) {
            columnWin[j] = true;
        }
    }

    if (rowWin === true) {
        win = true;
    }
}

function checkWinByArray(arr) {
    for (var i = 0; i < arr.length;i++){
        if (arr[i] === true) 
        {
            return true;
        }
    }
    return false
}

if (win || checkWinByArray(columnWin) || checkWinByArray(diagonaalWin)){
    document.write("WIN!");
} 
else {
    document.write("NO WIN")
}