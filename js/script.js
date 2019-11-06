let bord = document.getElementById('bord')
let check = document.getElementById('check')
let UIWord = document.getElementById('UIWord')
let word, lettersWord = [], lettersUIWord = [], gaps = [], tries = 5, gapsAmount = 25
let guessedLetters = ["", "", "", "", ""]
let duplicateLetters = []

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

function count() {
    for (var i = 0; i < lettersWord.length; i++) {
        duplicateLetters.push(1)
    }
}

console.log(words[word])

count()

function checking(){
    if (UIWord.value.length == 5){
        lettersUIWord = UIWord.value.split("")
        for (let i = 0; i < lettersWord.length; i++) { 
            if (words[word] == UIWord.value){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                check.disabled = true
            }
            else if (lettersWord[i] == lettersUIWord[i]){
                duplicateLetters[i]--
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                if (guessedLetters[i] === ""){
                    guessedLetters[i] = lettersUIWord[i]
                } 
                for (let i = 0; i < lettersWord.length; i++) {
                    if (tries > 1){
                        gaps[i + 5].innerHTML = guessedLetters[i]
                    }
                    else if (tries == 1){
                        gaps[i].innerHTML = guessedLetters[i]
                    }
                }
            } 
            else if (lettersWord.includes(lettersUIWord[i])){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rondje"
                if (guessedLetters[i] !== "" && tries > 1){
                    gaps[i + 5].innerHTML = guessedLetters[i]
                }
                else if (guessedLetters[i] !== "" && tries == 1){
                    gaps[i].innerHTML = guessedLetters[i]
                }
            }
            else if (!lettersWord.includes(lettersUIWord[i])){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "vierkant"
                if (guessedLetters[i] !== "" && tries > 1){
                    gaps[i + 5].innerHTML = guessedLetters[i]
                }
                else if (guessedLetters[i] !== "" && tries == 1){
                    gaps[i].innerHTML = guessedLetters[i]
                }
            }
        }
        checkErrors()
        for (let i = 0; i < 5; i++) {
            gaps.shift() 
        }
        checkTries()
    }
}

function checkErrors(){
    if (UIWord.value.length == 5){
        lettersUIWord = UIWord.value.split("")
        for (let i = 0; i < lettersWord.length; i++) { 
            if (words[word] == UIWord.value){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                check.disabled = true
            }
            else if (lettersWord[i] == lettersUIWord[i]){
                duplicateLetters[i]--
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                if (guessedLetters[i] === ""){
                    guessedLetters[i] = lettersUIWord[i]
                } 
                gaps[i].innerHTML = lettersUIWord[i]
            } 
            else if (lettersWord.includes(lettersUIWord[i]) && guessedLetters.includes(lettersUIWord) || lettersWord.includes(lettersUIWord[i])){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rondje"
                gaps[i].innerHTML = lettersUIWord[i]
            }
            else if (!lettersWord.includes(lettersUIWord[i]) || guessedLetters.includes(lettersUIWord[i])){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "vierkant"
                gaps[i].innerHTML = lettersUIWord[i]
            }
        }
    }
}