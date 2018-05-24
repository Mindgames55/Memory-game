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
            if (action === 'remove'){
              elements[j].classList.remove(classesArray[i]);
            }
            else {
              elements[j].classList.add(classesArray[i]);
            }
          }
        }
      }
    },timeDelay);
  }
//gives the elapsed time since the game began
  function timeCounter(){
    timeNow=((Date.now()-startingDate)/1000).toFixed(0);
    return timeNow;
  }
// displays the time on the page
  function setTimerOnPage(){
    let t=timeCounter();
    let min=Math.floor(t/60);
    let sec=t%60;
    const string='Timer '+leadingCeros(min, sec);
    document.getElementById('timer').textContent=string;
  }
//displays how many moves the user has done
  function movesNumber(moves){
    let movesString=document.getElementById('moves');
    movesString.textContent='Moves: '+moves;
    emptyStars(moves);
  }
//makes the user to lose stars depending on the number of moves
  function emptyStars(num){
    const stars=document.querySelectorAll('.fa');
    let index=(num>22 && num<26)?4:(num>=26 && num<30)?3:(num>=30 && num<35)?2:(num>=35 && num<42)?1:(num>=42)?0:undefined;
    if (index!==undefined && index!==indexDif){
      indexDif=index;
      stars[index].classList.add('fa-star-o');
    }
  }
//displays the leading ceros for the display of the timer
  function leadingCeros(min,sec){
    const cero='0';
    let minString=(min<10)?cero+min:''+min;
    let secString=(sec<10)?cero+sec:''+sec;
    return `${minString}:${secString}`
  }
//refreshes the page
  function reloading(){
    location.reload();
  }
//checks if every card was matched and displays the winning banner
  function checkIfWon(iniDate){
    if (counterCouple===8){
      cardGrid.removeEventListener('click', flipCard);
      document.querySelector('.wrapper').className='';
      const time=timeCounter();
      const header=document.querySelector('.header');
      const content=`<h2 class="winning-mess">You Won in <span>${time}</span> seconds!!!</h2>`;
      setTimeout(function(){ //some delay to allow animation of the last card before showing the winning message
        cardGrid.innerHTML=content;
        cardGrid.className='gameWon';
        header.classList.add('winning-mess');
        document.querySelector('#title').className='hidden';
        start.insertAdjacentHTML('afterend', `<button class="play-again btn align-center">Play Again</button>`);
        start.remove();
        document.querySelector('.play-again').addEventListener('click',reloading);
        cardGrid.appendChild(header);
        if (moves<=localStorage.getItem("master")||JSON.parse(localStorage.getItem("leaders")).length<5){
          createBoard();
        }
        const board=header.insertAdjacentElement('beforebegin',leadersBoard.parentNode);
        board.className='board';
      },500);
      clearInterval(timer);
    }
  }
//removes Nodes
  function thingsToRemove(){
    const thingsToBeRemove=document.querySelectorAll('.disappear');
    for (let i=0;i<thingsToBeRemove.length;i++){
      thingsToBeRemove[i].remove();
    }
  }
//flips the card when the users clicks on it if it is covered
  function flipCard(e){
      if (e.target.nodeName === 'IMG' && e.target.getAttribute('id')==='cover'){
        movesNumber(++moves);
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
      checkIfWon(startingDate);
    };
//displays the pop up box to get the name of a new record
  function getLeaderName(){
    const person = prompt("Please enter your name:", "Memory Game Master");
    if (person !== null && person !== "") {
      console.log(person);
      return person;
    }
  }
//creates an object with the data of the user with a new record
  function storagePerson(){
    const leader={
      name: getLeaderName(),
      moves: moves,
      time: timeCounter()
    };
    return leader;
  }
//sorts by number of moves. In case they are equal it is sorted by time.
  function updateLeaderBoard(objects){
    objects.sort(function(a, b){return (a.moves-b.moves===0)?a.time-b.time:a.moves-b.moves});
  }
  //creates the board and storages it on local storage
  function createBoard(){
    // let leaders=[];
    let leaders=JSON.parse(localStorage.getItem("leaders"));
    if (leaders.length>=5){
      leaders.splice(-1,1,storagePerson());
    }
    else {
      leaders.push(storagePerson());
    }
    console.log('lkeadersssss');
    console.log(leaders);
    updateLeaderBoard(leaders);
    localStorage.setItem("leaders", JSON.stringify(leaders));
    leaderEntries=JSON.parse(localStorage.getItem("leaders"));
    localStorage.setItem("master",leaderEntries[leaderEntries.length-1].moves);
    createBoardOnPage(leaderEntries);
  }
//adds the board to the DOM
  function createBoardOnPage(users){
    leadersBoard.innerHTML=[];
    let piece=document.createDocumentFragment();
    for (i=0;i<users.length;i++){
      let name=document.createElement('p');
      name.textContent=users[i].name;
      let moves=document.createElement('p');
      moves.textContent=users[i].moves;
      let time=document.createElement('p');
      time.textContent=users[i].time+' s';
      name.className='leader-name';
      moves.className='leader-moves';
      time.className='leader-time';
      piece.appendChild(name);
      piece.appendChild(moves);
      piece.appendChild(time);
    }
    leadersBoard.appendChild(piece);
    console.log(leadersBoard);
  }

//creates the deck of cards and adds it to the DOM
  function createDeck(){
    cardGrid.innerHTML='';
    thingsToRemove();
    const fragment=document.createDocumentFragment();
    let nameJpg=sorting(8);
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

  //global
  let cardGrid=document.querySelector('.grid');
  cardGrid.classList.add('hidden');
  const start=document.querySelector('.start');

  let wasTheFirstCardFlipped=false;
  let firstCardFlipped;
  let counterCouple=0;
  let startingDate;
  let timer;
  let moves;
  let indexDif=6;
  const leadersBoard=document.getElementById('board-body');
  let leaderEntries=JSON.parse(localStorage.getItem("leaders"));
  createBoardOnPage(leaderEntries);

//creates the start button event listener
  const flipEvent=start.addEventListener('click',function(e){
    // classAction(document.querySelectorAll('.desappear'),['hidden'],'toggle',0);
    cardGrid.classList.remove('hidden');
    cardGrid.classList.add('panel');
    document.getElementById('leaders-board').classList.add('hidden');
    // document.getElementById('leaders-board').remove();
    // leadersBoard.classList.add('hidden');
    leadersBoard.classList.remove('panel');
    createDeck();
    startingDate=Date.now();
    moves=0;
    movesNumber(moves);
    timer=setInterval(setTimerOnPage,1000);
    start.textContent='Reset';

    cardGrid.addEventListener('click', flipCard);

  });
});
