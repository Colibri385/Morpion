const game = document.querySelector('#game')
// tableau de tableau

let player = 1

// tant qu'il y a un element on l'efface
const cleanBoard = () => {
    while (game.firstChild)
        game.removeChild(game.firstChild)
}

// vérifier 
const checkValues = (v1, v2, v3) => v1 === v2 && v2 === v3

const checkLines = board => {
    let status = false
    
    board.forEach(line => {
        if (status) return true
        if(!line.includes(0))
          status = checkValues(line[0],line[1],line[2])
    })

    return status
}

const checkColumns = board =>  checkLines([
    [board[0][0],board[1][0],board[2][0]],
    [board[0][1],board[1][1],board[2][1]],
    [board[0][2],board[1][2],board[2][2]],
])

const checkdiagonals = board =>  checkLines([
    [board[0][0],board[1][1],board[2][2]],
    [board[0][2],board[1][1],board[2][0]],
])


// générer le plateau avec tableau à 0.
const generateBoard = board => {
    cleanBoard()
   
    if (checkLines(board) || checkColumns(board) || checkdiagonals(board)) {
        alert("GAME OVER !")
         return generateBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ])
    }

    // Récuperer ligne par ligne avec un index 0 ligne 1, 1 ligne 2, index 2 ligne 3.
    board.forEach((line, lineIndex) => {
        // créé une DIV
        const lineDiv = document.createElement('div')
        // mettre une classe line à la DIV
        lineDiv.classList.add('line')
        
        game.appendChild(lineDiv)

        // récupère les valeurs du tableau + index du carré
        line.forEach((value, squareIndex) => {
            const square = document.createElement('div')

            // créé une DIV avec class square avec un data-set  = 0
            // aide à mettre des couleur dans les cases + stock des données dans html
            square.classList.add('square')
            square.dataset.state = value
            lineDiv.appendChild(square)

            square.addEventListener('click', () => {
                if (value !==0) return
                // position du carre affecté au joeur
                board[lineIndex][squareIndex] = player
                player = player === 1 ? 2 : 1
                generateBoard(board)
                console.log(board)
            })
        })
    })
}


generateBoard([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
])




