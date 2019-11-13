let bord = document.getElementById('bord')
let check = document.getElementById('check')
let UIWord = document.getElementById('UIWord')
let word, lettersWord = [], lettersUIWord = [], gaps = [], tries = 5, gapsAmount = 25
let guessedLetters = []
/*let tempGoodLetters = [], */let tempIncludedLetters = []
let tempFinal = []
let guessed = "false"

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
        //tempGoodLetters.push(lettersWord[i])
        tempIncludedLetters.push(lettersWord[i])
        guessedLetters.push("")
        tempFinal.push("false")
    }
    guessedLetters.splice(0, 1, lettersWord[0])
    console.log(words[word])
}

function checking(){
    if (UIWord.value.length == 5){
        console.clear()
        lettersUIWord = UIWord.value.toLowerCase().split("")
        for (let i = 0; i < lettersWord.length; i++) {
            tempFinal[i] = "false"
            //tempGoodLetters[i] = lettersWord[i]
            tempIncludedLetters[i] = lettersWord[i]
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
        //console.log(lettersUIWord + " " + tempLetters)
        //console.log(guessed)
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
    checkTries()
}

function checkTries(){
    tries--
    if (tries <= 0){
        UIWord.value = words[word]
        check.disabled = true
    }
    if (tries == 0){
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
            tempIncludedLetters[i] = ""
            //tempGoodLetters[i] = ""
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "rechthoek"
            //console.log(tempLetters)
            //console.log(guessedLetters)
            tempFinal[i] = "true"
            //console.log(tempFinal)
            //console.log(tempGoodLetters)
            //console.log(tempIncludedLetters)
        }
    }
}

function checkWrongPlace(){
    for (let i = 0; i < lettersWord.length; i++) {
        /*if (tempGoodLetters.includes(lettersUIWord[i]) && lettersUIWord[i] != lettersWord[i] || */if(tempIncludedLetters.includes(lettersUIWord[i]) && lettersUIWord[i] != lettersWord[i]){ //&& tempIncludedLetters.includes(lettersUIWord[i])){
            //console.log(tempLetters[i])
            //console.log(tempLetters)
            //tempIncludedLetters.remove(lettersUIWord[i])
            let item = tempIncludedLetters.indexOf(lettersUIWord[i])
            tempIncludedLetters.splice(item, 1, "")
            //tempGoodLetters[i] = ""
            gaps[i].innerHTML = lettersUIWord[i]
            gaps[i].className = "rondje"
            tempFinal[i] = "true"
            //console.log(tempFinal)
            //console.log(tempGoodLetters)
            //console.log(tempIncludedLetters)
            //console.log(tempIncludedLetters)
        }
    }
}

function checkWrongLetter(){
    for (let i = 0; i < lettersWord.length; i++) {
        /*if (!tempGoodLetters.includes(lettersUIWord[i]) && tempFinal[i] !== "true" || */if(!tempIncludedLetters.includes(lettersUIWord[i]) && tempFinal[i] !== "true"){ //&& !tempIncludedLetters.includes(lettersUIWord[i])){
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