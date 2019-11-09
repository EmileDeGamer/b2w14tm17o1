let bord = document.getElementById('bord')
let check = document.getElementById('check')
let UIWord = document.getElementById('UIWord')
let word, lettersWord = [], lettersUIWord = [], gaps = [], tries = 5, gapsAmount = 25
let guessedLetters = ["", "", "", "", ""]

let tempLetters = []

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
    guessedLetters[0] = lettersWord[0]
}

function checkTries(){
    tries--
    if (tries <= 0){
        UIWord.value = words[word]
        check.disabled = true
    }
}

console.log(words[word])

function checking(){
    if (UIWord.value.length == 5){
        lettersUIWord = UIWord.value.split("")
        checkIfWordIsSame()
        if (check.disabled == false){
            checkIfLetterDoesntInclude()
            checkIfLetterIncludes()
            checkIfLetterExists()
        }
        for (let i = 0; i < 5; i++) {
            gaps.shift() 
        }
        checkTries()
        if (tries == 1){
            gaps[i].innerHTML = lettersWord[i]
        }
    }
}

function checkIfWordIsSame(){  
    if (words[word] == UIWord.value){
        for (let i = 0; i < lettersWord.length; i++) { 
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "rechthoek"
        }
        check.disabled = true
    }
}

function checkIfLetterExists(){
    for (let i = 0; i < lettersWord.length; i++) { 
        if (lettersWord[i] == lettersUIWord[i]){
            gaps[i].className = "rechthoek"
            gaps[i].innerHTML = lettersUIWord[i]
            for (let i = 0; i < lettersWord.length; i++) {
                if (tries > 1){
                    gaps[i + 5].innerHTML = guessedLetters[i]
                }
            }
            if (guessedLetters[i] === ""){
                guessedLetters[i] = lettersUIWord[i]
            } 
        } 
    }
}

function checkIfLetterIncludes(){
    for (let i = 0; i < lettersWord.length; i++) { 
        if (lettersUIWord.includes(lettersWord[i]) && !guessedLetters.includes(lettersWord[i])){
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "rondje"
            for (let i = 0; i < lettersWord.length; i++) {
                if (tries > 1){
                    gaps[i + 5].innerHTML = guessedLetters[i]
                }
            }
        } 
    }
}

function checkIfLetterDoesntInclude(){
    for (let i = 0; i < lettersWord.length; i++) { 
        if (!lettersUIWord.includes(lettersWord[i])){
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "vierkant"
            for (let i = 0; i < lettersWord.length; i++) {
                if (tries > 1){
                    gaps[i + 5].innerHTML = guessedLetters[i]
                }
            }
        }
    }
}