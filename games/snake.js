/*
    Tic Tac Toe game experiment
    Copyright 2020 Alexandr 'JFAexe' Konichenko
*/

/* Variables */
const
    canvas  = document.getElementById('game'),
    context = canvas.getContext('2d'),
    pausbtn = doc.getElementById('_pause_btn'),
    title   = doc.getElementById('_title')

const
    canvW = canvas.width,
    canvH = canvas.height,
    cW    = canvW * 0.1,
    cH    = canvH * 0.1

const
    speeed = 10,
    grid   = 10

let freeze = 0,
    fail   = false
    paused = true

let score = 0


/* Short functions */
const getThemeColor  = () => getComputedStyle(doc.body).color
const randomizeInt   = (min, max) => Math.floor(Math.random() * (max - min)) + min
const runGame        = () => requestAnimationFrame(processGame)
const clearCanv      = () => context.clearRect(0, 0, canvW, canvH)
const updatePauseBtn = () => pausbtn.textContent = paused ? 'Play' : 'Pause'


/* Setup */
const snake = { x: canvW * 0.5, y: canvH * 0.5, dx: grid, dy: 0, cells: [], max: 2 }
const apple = { x: randomizeInt(1, cW - 1) * grid, y: randomizeInt(1, cH - 1) * grid }

runGame()


/* Game */
function processGame() {
    runGame()

    if (paused) {
        drawPaused()

        return
    }

    if (++freeze < speeed || fail) {
        return
    } else {
        freeze = 0
        title.textContent = 'score: ' + score
    }

    clearCanv()
    updateSnake()
    drawGame()

    score++
}

function drawGame() {
    context.fillStyle = getThemeColor()

    context.fillRect(apple.x, apple.y, grid, grid)

    snake.cells.forEach((cell) => { context.fillRect(cell.x, cell.y, grid, grid) })
}

function finishGame() {
    fail = true

    title.textContent = 'fail. score: ' + score
}

function resetGame() {
    snake.cells.pop()

    clearCanv()

    snake.x     = canvW * 0.5
    snake.y     = canvH * 0.5
    snake.dx    = grid
    snake.dy    = 0
    snake.cells = []
    snake.max   = 2

    apple.x = randomizeInt(1, cW - 1) * grid
    apple.y = randomizeInt(1, cH - 1) * grid

    score  = 0
    fail   = false
    paused = false
    freeze = 8

    updatePauseBtn()
}

function togglePause() {
    if (!fail) {
        paused = !paused

        updatePauseBtn()
    }
}

function drawPaused() {
    clearCanv()

    context.fillStyle   = getThemeColor()
    context.font        = '64px Anonymous Pro'
    context.textAlign   = 'center'
    context.fillText('Paused', canvW * 0.5, canvH * 0.5)
}


/* Updators */
function updateSnake() {
    snake.x += snake.dx
    snake.y += snake.dy

    checkBorders()
    updateCells()
}

function updateCells() {
    let sc = snake.cells

    sc.unshift({ x: snake.x, y: snake.y })

    if (sc.length > snake.max) { sc.pop() }

    snake.cells.forEach((cell, index) => {
        checkAppleCollision(cell)
        checkSelfCollision(cell, index)
    })
}


/* Checkers */
function checkBorders() {
    if (snake.x < 0) { snake.x = canvW - grid } else if (snake.x >= canvW) { snake.x = 0 }
    if (snake.y < 0) { snake.y = canvH - grid } else if (snake.y >= canvH) { snake.y = 0 }
}

function checkAppleCollision(cell) {
    if (cell.x === apple.x && cell.y === apple.y) {

        score += 25
        snake.max++

        apple.x = randomizeInt(1, cW - 1) * grid
        apple.y = randomizeInt(1, cH - 1) * grid
    }
}

function checkSelfCollision(cell, index) {
    for (var i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            finishGame()
        }
    }
}


/* Handlers */
pausbtn.addEventListener('click', () => { togglePause() })
doc.getElementById('_restart_btn').addEventListener('click', () => { resetGame() })

document.addEventListener('keydown', (event) => {
    if (paused) { return }

    if (event.which === 37) { moveLeft() }
    if (event.which === 39) { moveRight() }
    if (event.which === 38) { moveUp() }
    if (event.which === 40) { moveDown() }
})

function moveLeft() {
    if (snake.dx <= 0) {
        snake.dx = -grid
        snake.dy = 0
    }
}

function moveRight() {
    if (snake.dx >= 0 ) {
        snake.dx = grid
        snake.dy = 0
    }
}

function moveUp() {
    if (snake.dy <= 0) {
        snake.dx = 0
        snake.dy = -grid
    }
}

function moveDown() {
    if (snake.dy >= 0) {
        snake.dx = 0
        snake.dy = grid
    }
}


/* Mobile buttons */
const
    mob = doc.getElementById('_theme_mobile'),
    btl = doc.getElementById('_buttons').classList,
    tag = 'desktop'

let updateDesktopBtn = () => mob.textContent = btl.contains(tag) ? 'Desktop' : 'Mobile'

if (JSON.parse(lsg.getItem(tag))) {
    updateDesktopBtn()

    btl.add(tag)
}

mob.addEventListener('click', () => {
    updateDesktopBtn()

    lsg.setItem(tag, btl.toggle(tag))
})