    var log=console.log;
    function op(elem){return document.querySelector(elem)}
    function opp(elem){return document.querySelectorAll(elem)}

    var lockBox=op('.lockBox');
    for(var a=0; a< 24; a++){
      lockBox.insertAdjacentHTML("afterbegin",`<div class="dot"><div class="dotArea" onmousedown="down(this)"><i>${a}</i></div></div>`)
    }

    var startDot,
    svg=op("svg"),
    dots=opp(".dot"),
    lineData="M",
    tempLineData,
    svgPath=op('svg path'),
    inputData="",
    correctData="20212223191511732104561098121314181716",
    correctDataReverse="16171814131289106540123711151923222120";

    function end(){
      document.body.style.setProperty('--baseCol',(inputData==correctData||inputData==correctDataReverse)?"#0f0":"#f00");
      if(inputData==correctData||inputData==correctDataReverse){unlocked()}
      
      startDot=undefined;
      lineData="M";
      inputData="";
      tempLineData=undefined;

      setTimeout(()=>{
        opp('.dot.active').forEach(val=>{val.classList.remove('active')})
        svgPath.setAttribute("d",'');
        document.body.style.setProperty('--baseCol',"#712cf9");
      },500)
    }

    function down(elem){
      startDot=elem;
      lockBox.addEventListener('mousemove',moving)
      addEvToMouseEnter();
      lineData+=`${startDot.parentElement.offsetLeft +5},${startDot.parentElement.offsetTop +5}`;
      makeLine();
      startDot.classList.add("active")
    }
    document.onmouseup=function (){
      lockBox.removeEventListener('mousemove',moving)
      removeEvToMouseEnter();
      tempLineData=''
      updateLine();
      end(startDot,tempLineData,lineData)
    }
    function moving(e){
      makeLineWhileMoving(e.clientX,e.clientY)
    }
    function makeLineWhileMoving(x,y){
      var x=Math.floor(x - lockBox.getBoundingClientRect().left);
      var y=Math.floor(y - lockBox.getBoundingClientRect().top);

      tempLineData=" L"+x+','+y;

      updateLine()
    }

    function makeLine(e=startDot){
      e.target=startDot;
      var dot=e.target.parentElement;
      dot.classList.add('active');
      var x=dot.getBoundingClientRect().left,
      y=dot.getBoundingClientRect().top;
      inputData+=dot.innerText;

      makeLineWhileMoving(x,y)
      lineData+=tempLineData;
    }

    function addEvToMouseEnter(){
      opp(".dotArea").forEach(val=>{
        val.addEventListener("mouseenter",makeLine);
      })
    }
    function removeEvToMouseEnter(){
      opp(".dotArea").forEach(val=>{
        val.removeEventListener("mouseenter",makeLine);
      })
    }
    function updateLine(){
      svgPath.setAttribute("d",lineData+tempLineData);
    }

    function unlocked(){
        const header = document.body.querySelector('h1')
        document.body.removeChild(lockBox)
        document.body.removeChild(header)
        document.body.classList.add('unlocked')
        const playAudioBtn = document.getElementById('playAudioBtn')
        const passLbl = document.getElementById('passLbl')
        const passInput = document.getElementById('passInput')
        const enterBtn = document.getElementById('enterBtn')
        playAudioBtn.style.display = "unset"
        passLbl.style.display = "unset"
        passInput.style.display = "unset"
        enterBtn.style.display = "unset"
        const audio = new Audio("er-audio.mp3")
        audio.play()
        playAudioBtn.addEventListener('click' , ()=> {
            audio.play()
        })
        enterBtn.addEventListener('click', ()=>{
          if(passInput.value.toLowerCase() == "crce"){
            document.body.removeChild(playAudioBtn)
            const form = document.getElementById('form')
            document.body.removeChild(form)

            const img = document.querySelector('img')
            img.style.display = 'unset'
          }else{
            passInput.value = ""
            passInput.style.border = "1px solid red"
          }
        })
    }