let bord = document.getElementById('bord')
let check = document.getElementById('check')
let UIWord = document.getElementById('UIWord')
let word, lettersWord = [], lettersUIWord = [], gaps = [], tries = 5, gapsAmount = 25
let guessedLetters = ["", "", "", "", ""]
//let duplicateLetters = [0, 0, 0, 0, 0]

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
    for (let i = 0; i < lettersWord.length; i++) {
        tempLetters.push(lettersWord[i])
    }
}

function checkTries(){
    tries--
    if (tries <= 0){
        UIWord.value = words[word]
        check.disabled = true
    }
}

/*function count() {
    for (var i = 0; i < lettersWord.length; i++) {
        duplicateLetters.push(1)
    }
}*/

console.log(words[word])

function checking(){
    if (UIWord.value.length == 5){
        lettersUIWord = UIWord.value.split("")
        tempLetters = lettersWord
        for (let i = 0; i < lettersWord.length + 1; i++) { 
            if (words[word] == UIWord.value){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                check.disabled = true
            }
            else if (lettersUIWord[i] == lettersWord[i]){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                if (guessedLetters[i] === ""){
                    guessedLetters[i] = lettersUIWord[i]
                } 
                tempLetters.splice(i, 1)
                for (let i = 0; i < lettersWord.length; i++) {
                    if (tries > 1){
                        gaps[i + 5].innerHTML = guessedLetters[i]
                    }
                    else if (tries == 1){
                        gaps[i].innerHTML = guessedLetters[i]
                    }
                }
            } 
            else if (tempLetters.includes(lettersUIWord[i])){// && tempLetters.includes(lettersUIWord[i])){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rondje"
                for (let i = 0; i < lettersWord.length; i++) {
                    if (tries > 1){
                        gaps[i + 5].innerHTML = guessedLetters[i]
                    }
                    else if (tries == 1){
                        gaps[i].innerHTML = guessedLetters[i]
                    }   
                }
                /*let char = lettersUIWord.indexOf(i)
                if (char > -1){
                    tempLetters.splice(char, 1)
                }*/
                
                console.log(tempLetters)
            }
            else if (!tempLetters.includes(lettersUIWord[i])){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "vierkant"
                for (let i = 0; i < lettersWord.length; i++) {
                    if (tries > 1){
                        gaps[i + 5].innerHTML = guessedLetters[i]
                    }
                    else if (tries == 1){
                        gaps[i].innerHTML = guessedLetters[i]
                    }
                }
            }
        }
        for (let i = 0; i < 5; i++) {
            gaps.shift() 
        }
        checkTries()
    }
}