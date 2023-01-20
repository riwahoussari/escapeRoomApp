const correctCode = '432159131721222324201918141516121110678'
const correctCode2 ="876101112161514181920242322211713951234"
let enteredCode = ""

const dots = document.body.querySelectorAll('div div')
const resetBtn = document.getElementById('reset')
const enterPattern = document.getElementById('enterPattern')

dots.forEach(dot => {
    dot.addEventListener('click', ()=>{
        if(!dot.classList.contains('clicked')){
            dot.classList.add('clicked')
            enteredCode += dot.textContent
        }
        if(enteredCode == correctCode.slice(0,enteredCode.length) ||
           enteredCode == correctCode2.slice(0, enteredCode.length)){
            return
        }else{
            addClassIncorrect()
        }
    })
})
enterPattern.addEventListener('click' , ()=>{
    if(enteredCode==correctCode||enteredCode==correctCode2){
        patternUnlocked()
    }else{
        addClassIncorrect()
    }
})
function addClassIncorrect(){
    reset()
    dots.forEach(dot => dot.classList.add('incorrect'))
    window.addEventListener('animationend',()=>{
        dots.forEach(dot=>dot.classList.remove('incorrect'))
    })
}
function reset(){
    dots.forEach(dot =>{
        dot.classList.remove('clicked')
        enteredCode = ""
    })
}

function patternUnlocked(){
    const lockBox = document.getElementById('lockbox')
    const patternh1= document.getElementById('patternh1')
    patternh1.style.display = 'none'
    enterPattern.style.display = 'none'
    lockBox.style.display = 'none'

    const playAudioBtn = document.getElementById('playAudioBtn')
    const passLbl = document.getElementById('passLbl')
    const passInput = document.getElementById('passInput')
    const enterPass = document.getElementById('enterPass')
    playAudioBtn.style.display = "unset"
    passLbl.style.display = "unset"
    passInput.style.display = "unset"
    enterPass.style.display = "unset"
    const audio = new Audio("er-audio.mp3")
    audio.play()
    playAudioBtn.addEventListener('click' , ()=> {
        audio.play()
    })
    enterPass.addEventListener('click', ()=>{
        if(passInput.value.toLowerCase() == "crce"){
            document.body.removeChild(playAudioBtn)
            document.body.removeChild(passLbl)
            document.body.removeChild(passInput)
            document.body.removeChild(enterPass)
            const img = document.querySelector('img')
            img.style.display = 'unset'
            document.body.style.backgroundColor = 'white'
        }else{
            passInput.value = ""
            passInput.classList.add('inputAnimation')
            window.addEventListener('animationend',()=>{
                passInput.classList.remove('inputAnimation')
            })
        }
    })
}