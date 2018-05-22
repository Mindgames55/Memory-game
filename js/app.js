document.addEventListener('DOMContentLoaded', function(){
  // creates and array with couples of random numbers from 1 to limSup.
  function sorting(limSup){
    let array=[];
    for (let i=1;i<=2*limSup;i++){
        let value=(i>limSup)?i-limSup:i;
        array.push(value);
    }
    return array.sort(function(a, b){return 0.5 - Math.random()});
  }
//creates current card object
  function cardObj(whichCard, clicked){
      let card={
      name: whichCard,
      imgFrontObj: clicked,
      imgBackObj: clicked.parentNode.lastChild,
      divObj:clicked.parentNode
    };
    return card;
  }
//toggling classes to objects allowing right timing for animation
  function classAction(elements, classesArray,action,timeDelay){
    setTimeout(function(){
      for (let j=0;j<elements.length;j++){
        for (let i=0;i<classesArray.length;i++){
          if (action === 'toggle'){
            elements[j].classList.toggle(classesArray[i]);
          }
          else {
            elements[j].classList.remove(classesArray[i]);
          }
        }
      }
    },timeDelay);
  }

  function timeCounter(){
    timeNow=((Date.now()-startingDate)/1000).toFixed(0);
    return timeNow;
  }

  function setTimerOnPage(){
    let t=timeCounter();
    let min=Math.floor(t/60);
    let sec=t%60;
    const string=leadingCeros(min, sec);
    console.log(string);
    document.getElementById('timer').textContent=string;
  }

  function leadingCeros(min,sec){
    const cero='0';
    let minString=(min<10)?cero+min:''+min;
    let secString=(sec<10)?cero+sec:''+sec;
    return `${minString}:${secString}`
  }

  function reloading(){
    location.reload();
  }

  function checkIfWon(iniDate){
    if (counterCouple===8){
      const time=timeCounter();
      const header=document.querySelector('.header');
      setTimeout(function(){
        const content=`<h1 class="winning-mess">You Won in <span>${time}</span> seconds!!!</h1>`;
        cardGrid.innerHTML=content;
        cardGrid.classList.add('gameWon');
        header.classList.add('winning-mess');
        start.insertAdjacentHTML('afterend', `<button class="play-again btn align-center">Play Again</button>`);
        start.remove();
        document.querySelector('.play-again').addEventListener('click',reloading);
        cardGrid.appendChild(header);
        header.insertAdjacentHTML('beforebegin','<div class="emoji"></div>');

      },500);
      clearInterval(timer);
    }
  }

  function flipCard(e){
      if (e.target.nodeName === 'IMG' && e.target.getAttribute('id')==='cover'){
        classAction([e.target.parentNode],['flip'],'toggle',0);  //flip the card
        if (!wasTheFirstCardFlipped){
          wasTheFirstCardFlipped=true;
          firstCardFlipped=cardObj('first',e.target);
        }
        else {
            wait=true;
            wasTheFirstCardFlipped=false;
            const secondCardFlipped=cardObj('second',e.target);
            if (firstCardFlipped.imgBackObj.getAttribute('src')===secondCardFlipped.imgBackObj.getAttribute('src')){
                classAction([firstCardFlipped.imgBackObj,secondCardFlipped.imgBackObj], ['success'],'toggle',500);
              counterCouple++;
             }
             else {
                 classAction([firstCardFlipped.divObj,secondCardFlipped.divObj],['flip'],'remove',500);
             }
        }
      }
      console.log(startingDate);
      checkIfWon(startingDate);
    };


  function createDeck(){
    cardGrid.innerHTML='';
    const fragment=document.createDocumentFragment();
    let nameJpg=sorting(8);
    console.log(nameJpg);
    for (let i=0;i<16;i++){
        const card=document.createElement('div');
        card.className='card';
        const cover=document.createElement('img');
        cover.setAttribute('src','https://res-4.cloudinary.com/hireclub/image/upload/c_fill,f_auto,g_north,h_200,q_auto,w_200/pyhntzkpmxmoaaj8ksfu');
        cover.setAttribute('id','cover');
        cover.className='round-border front face';
        const cardFlipped=document.createElement('img');
        cardFlipped.setAttribute('src','img/svg/'+nameJpg[i]+'.svg');
        cardFlipped.className='back flipped round-border face';
        card.appendChild(cover);
        card.appendChild(cardFlipped)
        fragment.appendChild(card);
    }
    cardGrid.appendChild(fragment);
  }
  let cardGrid=document.querySelector('.grid');
  cardGrid.classList.add('hidden');
  const start=document.querySelector('.start');

  let wasTheFirstCardFlipped=false;
  let firstCardFlipped;
  let counterCouple=0;
  let startingDate;
  let timer;
  const flipEvent=start.addEventListener('click',function(){
    classAction(document.querySelectorAll('.desappear'),['hidden'],'toggle');
    cardGrid.classList.remove('hidden');
    console.log('starting');
    createDeck();
    startingDate=Date.now();
    timer=setInterval(setTimerOnPage,1000);
    console.log(timer+'hhh');
    start.textContent='Reset';

    cardGrid.addEventListener('click', flipCard);
  });
});
