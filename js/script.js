let bord = document.getElementById('bord')
let check = document.getElementById('check')
let UIWord = document.getElementById('UIWord')
let display = document.getElementById('input')
let lingoBord = document.getElementById('lingoBord')
let lingo = [], lingoNumbers = []
let word, lettersWord = [], lettersUIWord = [], gaps = [], tries = 5, gapsAmount
let guessedLetters = []
let tempLetters = []
let tempFinal = []
let guessed = "false"

check.onclick = function(){checking()}

setup()

function setup(){
    for (let i = 0; i < 25; i++) {
        lingoNumbers.push(i+=1)
        i--
    }
    shuffle(lingoNumbers)
    for (let i = 0; i < 25; i++) {
        let gap = document.createElement('span')
        gap.id = "gap"
        gap.innerHTML = lingoNumbers[i]
        lingoBord.appendChild(gap)   
        lingo.push(gap)
    }
    for (let i = 0; i < 5; i++) {
        let ball = Math.floor(Math.random() * 25)
        if (lingo[ball].className == ""){
            lingo[ball].className = "rechthoek"
        }
        else {
            i--
        }
    }
    lingoBord.style.gridTemplateColumns = "repeat(5, 100px)"
    lingoBord.style.gridTemplateRows = "repeat(5, 100px)"
    reset()
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function checking(){
    if (UIWord.value.length == lettersWord.length){
        lettersUIWord = UIWord.value.toLowerCase().split("")
        for (let i = 0; i < lettersWord.length; i++) {
            tempFinal[i] = "false"
            tempLetters[i] = lettersWord[i]
        }
        if (words[word] == UIWord.value){
            for (let i = 0; i < lettersWord.length; i++) {
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
            }
            check.disabled = true
            guessed = "true"
        }
        if (guessed == "false"){
            checkGoodPlace()
            checkWrongPlace()
            checkWrongLetter()
            addGuessedLetters()
            checkGuessedLetters()
            checkTries()
            for (let i = 0; i < lettersWord.length; i++) {
                gaps.shift() 
            }
        }
        if (guessed == "true"){
            alert("Juist! :D Woord: " + words[word])
            grabBall()
            reset()
        }
    }
}

function checkTries(){
    tries--
    if (tries == 0){
        UIWord.value = words[word]
        check.disabled = true
        alert("Het woord is: " + words[word])
        reset()
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
            gaps[i + lettersWord.length].innerHTML = guessedLetters[i]
            if(gaps[i + lettersWord.length].innerHTML !== ""){
                gaps[i + lettersWord.length].className = "rechthoek"
            }
        }
    }
}

function checkGuessedLetters(){
    if (JSON.stringify(guessedLetters) === JSON.stringify(lettersWord)){
        check.disabled = true
        alert("Juist! :D Woord: " + words[word])
        grabBall()
        reset()
    }
}

function reset(){   
    guessed = "false"
    UIWord.value = ""
    lettersWord = [], lettersUIWord = [], tries = 5, guessedLetters = [], tempLetters = [], tempFinal = [], gapsAmount = 0, gaps = []
    check.disabled = false
    word = Math.floor(Math.random() * words.length) + 1
    while (bord.firstChild) {
        bord.removeChild(bord.firstChild);
    }
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
    console.log(words[word])
}

function grabBall(){
    let ball = Math.floor(Math.random() * 25)
    if (lingo[ball].className == ""){
        lingo[ball].className = "rechthoek"
        checkWin()
    }
    else {
        grabBall()
    }
}

function checkWin(){
    //Links-Rechts
    if (lingo[0].className == "rechthoek" && lingo[1].className == "rechthoek" && lingo[2].className == "rechthoek" && lingo[3].className == "rechthoek" && lingo[4].className == "rechthoek"){
        win()
    }
    else if (lingo[5].className == "rechthoek" && lingo[6].className == "rechthoek" && lingo[7].className == "rechthoek" && lingo[8].className == "rechthoek" && lingo[9].className == "rechthoek"){
        win()
    }
    else if (lingo[10].className == "rechthoek" && lingo[11].className == "rechthoek" && lingo[12].className == "rechthoek" && lingo[13].className == "rechthoek" && lingo[14].className == "rechthoek"){
        win()
    }
    else if (lingo[15].className == "rechthoek" && lingo[16].className == "rechthoek" && lingo[17].className == "rechthoek" && lingo[18].className == "rechthoek" && lingo[19].className == "rechthoek"){
        win()
    }
    else if (lingo[20].className == "rechthoek" && lingo[21].className == "rechthoek" && lingo[22].className == "rechthoek" && lingo[23].className == "rechthoek" && lingo[24].className == "rechthoek"){
        win()
    }
    //Boven-Beneden
    else if (lingo[0].className == "rechthoek" && lingo[5].className == "rechthoek" && lingo[10].className == "rechthoek" && lingo[15].className == "rechthoek" && lingo[20].className == "rechthoek"){
        win()
    }
    else if (lingo[1].className == "rechthoek" && lingo[6].className == "rechthoek" && lingo[11].className == "rechthoek" && lingo[16].className == "rechthoek" && lingo[21].className == "rechthoek"){
        win()
    }
    else if (lingo[2].className == "rechthoek" && lingo[7].className == "rechthoek" && lingo[12].className == "rechthoek" && lingo[17].className == "rechthoek" && lingo[22].className == "rechthoek"){
        win()
    }
    else if (lingo[3].className == "rechthoek" && lingo[8].className == "rechthoek" && lingo[13].className == "rechthoek" && lingo[18].className == "rechthoek" && lingo[23].className == "rechthoek"){
        win()
    }
    else if (lingo[4].className == "rechthoek" && lingo[9].className == "rechthoek" && lingo[14].className == "rechthoek" && lingo[19].className == "rechthoek" && lingo[24].className == "rechthoek"){
        win()
    }
    //Schuin
    else if (lingo[0].className == "rechthoek" && lingo[6].className == "rechthoek" && lingo[12].className == "rechthoek" && lingo[18].className == "rechthoek" && lingo[24].className == "rechthoek"){
        win()
    }
    else if (lingo[4].className == "rechthoek" && lingo[8].className == "rechthoek" && lingo[12].className == "rechthoek" && lingo[16].className == "rechthoek" && lingo[20].className == "rechthoek"){
        win()
    }
}

function win(){
    alert("Gewonnen! :D")
    location.reload()
}