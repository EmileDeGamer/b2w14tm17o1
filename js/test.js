let bord = document.getElementById('bord')
let check = document.getElementById('check')
let UIWord = document.getElementById('UIWord')
let word, lettersWord = [], lettersUIWord = [], gaps = [], tries = 5, gapsAmount = 25
let guessedLetters = []
let tempLetters = []
let tempFinal = []

check.onclick = function(){checking()}

setup()

function setup(){
    word = Math.floor(Math.random() * words.length) + 1
    lettersWord = words[word].split("")
    for (let i = 0; i < gapsAmount; i++) {
        let gap = document.createElement('span')
        gap.id = "gap"
        bord.appendChild(gap)
        gaps.push(gap)
    }
    gaps[0].innerHTML = lettersWord[0]
    for (let i = 0; i < lettersWord.length; i++) {
        tempLetters.push(lettersWord[i])
        guessedLetters.push("")
        tempFinal.push("false")
    }
    guessedLetters.splice(0, 1, lettersWord[0])
    console.log(words[word])
}

function checking(){
    if (UIWord.value.length == 5){
        console.clear()
        lettersUIWord = UIWord.value.split("")
        for (let i = 0; i < lettersWord.length; i++) {
            tempFinal[i] = "false"
            tempLetters[i] = lettersWord[i]
        }
        //console.log(lettersUIWord + " " + tempLetters)
        if (words[word] == UIWord.value){
            for (let i = 0; i == lettersWord.length; i++) {
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                check.disabled = true
            }
        }
        if(check.disabled != true){
            checkGoodPlace()
            checkWrongPlace()
            checkWrongLetter()
            addGuessedLetters()
        }
        for (let i = 0; i < 5; i++) {
            gaps.shift() 
        }
    }
    checkTries()
}

function checkTries(){
    tries--
    if (tries <= 0){
        UIWord.value = words[word]
        check.disabled = true
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
            //console.log(tempLetters)
            //console.log(guessedLetters)
            tempFinal[i] = "true"
            //console.log(tempFinal)
        }
    }
}

function checkWrongPlace(){
    for (let i = 0; i < lettersWord.length; i++) {
        if (tempLetters.includes(lettersUIWord[i]) && lettersUIWord[i] != lettersWord[i]){
            //console.log(tempLetters[i])
            //console.log(tempLetters)
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "rondje"
            tempFinal[i] = "true"
            //console.log(tempFinal)
        }
    }
}

function checkWrongLetter(){
    for (let i = 0; i < lettersWord.length; i++) {
        if (!tempLetters.includes(lettersUIWord[i]) && tempFinal[i] !== "true"){
            //console.log(tempLetters[i])
            //console.log(tempLetters)
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "vierkant"
        }
    }
}

function addGuessedLetters(){
    for (let i = 0; i < lettersWord.length; i++) {
        if (tries > 1){
            gaps[i + 5].innerHTML = guessedLetters[i]
        }
        /*else if (tries == 1){
            gaps[i].innerHTML = 
        }*/
    }
}