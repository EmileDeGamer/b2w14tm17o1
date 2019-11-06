let bord = document.getElementById('bord')
let check = document.getElementById('check')
let UIWord = document.getElementById('UIWord')
let word, lettersWord = [], lettersUIWord = [], gaps = [], tries = 5, gapsAmount = 25

check.onclick = function(){checkWord()}

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
}

function checkWord(){
    if (UIWord.value.length == 5){
        lettersUIWord = UIWord.value.split("")
        for (let i = 0; i < lettersWord.length; i++) {
            if (words[word] == UIWord.value){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                check.disabled = true
            }
            else if (lettersWord[i] == lettersUIWord[i]){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rechthoek"
                gaps[i + 5].innerHTML = lettersUIWord[i]
            }
            else if (lettersWord.includes(lettersUIWord[i])){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "rondje"
            }
            else if (!lettersWord.includes(lettersUIWord[i])){
                gaps[i].innerHTML = lettersUIWord[i]
                gaps[i].className = "vierkant"
            }
        }
        for (let i = 0; i < 5; i++) {
            gaps.shift() 
        }
        checkTries()
    }
}

function checkTries(){
    tries--
    if (tries <= 0){
        check.disabled = true
    }
}