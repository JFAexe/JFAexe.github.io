/*
    Tic Tac Toe game experiment
    Copyright 2020 Alexandr 'JFAexe' Konichenko
*/

/* Variables */
const cells = doc.querySelectorAll('[data-cell]'),
      title = doc.getElementById('_title'),
      rsbtn = doc.getElementById('_restart_btn'),
      board = doc.getElementById('_board'),
      blst  = board.classList

const c_x = 'x',
      c_o = 'o'

const combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

let turn


/* Setup */
rsbtn.addEventListener('click', () => { beginGame() })

beginGame()


/* Game */
function beginGame() {
    rsbtn.classList.add('hide')

    cells.forEach(cell => {
        resetCell(cell)

        cell.addEventListener('click', handleClick, { once: true })
    })

    updateVisuals()
}

function finishGame(draw = false) {
    let text

    if (draw) {
        text = 'draw'
    } else {
        text = (turn ? c_o : c_x) + ' won'
    }

    title.textContent = text

    rsbtn.classList.remove('hide')

    blst.remove(c_x)
    blst.remove(c_o)

    cells.forEach(cell => { cell.removeEventListener('click', handleClick) })
}


/* Handler */
function handleClick(event) {
    const cell = event.target,
          curr = turn ? c_o : c_x

    updateCell(cell, curr)

    if (checkWin(curr)) {
        finishGame()
    } else if (checkDraw()) {
        finishGame(true)
    } else {
        updateTurn()
        updateVisuals()
    }
}


/* Updators */
function updateCell(cell, state) {
    cell.classList.add(state)
}

function resetCell(cell) {
    cell.classList.remove(c_x)
    cell.classList.remove(c_o)

    cell.removeEventListener('click', handleClick)
}

function updateTurn() {
    turn = !turn
}

function updateVisuals() {
    const curr = turn ? c_o : c_x

    blst.remove(c_x)
    blst.remove(c_o)

    blst.add(curr)

    title.textContent = curr + '\'s turn'
}


/* Checkers */
function checkWin(state) {
    return combinations.some(combo => {
        return combo.every(index => {
            return cells[index].classList.contains(state)
        })
    })
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(c_x) || cell.classList.contains(c_o)
    })
}