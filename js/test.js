let bord = document.getElementById('bord')
let check = document.getElementById('check')
let UIWord = document.getElementById('UIWord')
let display = document.getElementById('input')
let word, lettersWord = [], lettersUIWord = [], gaps = [], tries = 5, gapsAmount
let guessedLetters = []
let tempLetters = []
let tempFinal = []
let guessed = "false"

check.onclick = function(){checking()}

setup()

function setup(){
    word = Math.floor(Math.random() * words.length) + 1
    lettersWord = words[word].split("")
    gapsAmount = words[word].length * 5
    for (let i = 0; i < gapsAmount; i++) {
        let gap = document.createElement('span')
        gap.id = "gap"
        bord.appendChild(gap)
        gaps.push(gap)
    }
    gaps[0].innerHTML = lettersWord[0]
    gaps[0].className = "rechthoek"
    for (let i = 0; i < lettersWord.length; i++) {
        tempLetters.push(lettersWord[i])
        guessedLetters.push("")
        tempFinal.push("false")
    }
    guessedLetters.splice(0, 1, lettersWord[0])
    bord.style.gridTemplateColumns = "repeat(" + words[word].length + ", 100px)"
    bord.style.gridTemplateRows = "repeat(" + tries + ", 100px)"
    let width = (words[word].length * 100)
    display.style.width = "" + width + "px"
}

function checking(){
    if (UIWord.value.length == 5){
        lettersUIWord = UIWord.value.toLowerCase().split("")
        for (let i = 0; i < lettersWord.length; i++) {
            tempFinal[i] = "false"
            tempLetters[i] = lettersWord[i]
            if (words[word] == UIWord.value){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                check.disabled = true
                guessed = "true"
            }
        }
        if (guessed == "true"){
            alert("Juist! :D Woord: " + words[word])
            location.reload()
        }
        if (guessed == "false"){
            checkGoodPlace()
            checkWrongPlace()
            checkWrongLetter()
            addGuessedLetters()
        }
        for (let i = 0; i < 5; i++) {
            gaps.shift() 
        }
    }
    checkGuessedLetters()
    checkTries()
}

function checkTries(){
    tries--
    if (tries < 1){
        UIWord.value = words[word]
        check.disabled = true
        alert("Het woord is: " + words[word])
        location.reload()
    }
}

function checkGoodPlace(){
    for (let i = 0; i < lettersWord.length; i++) {
        if (lettersUIWord[i] == lettersWord[i]){
            if(guessedLetters[i] == ""){
                guessedLetters[i] = lettersUIWord[i]
            }
            tempLetters[i] = ""
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "rechthoek"
            tempFinal[i] = "true"
        }
    }
}

function checkWrongPlace(){
    for (let i = 0; i < lettersWord.length; i++) {
        if(tempLetters.includes(lettersUIWord[i]) && lettersUIWord[i] != lettersWord[i]){
            let item = tempLetters.indexOf(lettersUIWord[i])
            tempLetters.splice(item, 1, "")
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "rondje"
            tempFinal[i] = "true"
        }
    }
}

function checkWrongLetter(){
    for (let i = 0; i < lettersWord.length; i++) {
        if(!tempLetters.includes(lettersUIWord[i]) && tempFinal[i] !== "true"){
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "vierkant"
        }
    }
}

function addGuessedLetters(){
    for (let i = 0; i < lettersWord.length; i++) {
        if (tries > 1){
            gaps[i + 5].innerHTML = guessedLetters[i]
            if(gaps[i + 5].innerHTML !== ""){
                gaps[i + 5].className = "rechthoek"
            }
        }
    }
}

function checkGuessedLetters(){
    if (JSON.stringify(guessedLetters) === JSON.stringify(lettersWord)){
        check.disabled = true
        alert("Juist! :D Woord: " + words[word])
        location.reload()
    }
}