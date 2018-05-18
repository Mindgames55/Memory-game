document.addEventListener('DOMContentLoaded', function(){
  // this function creates and array with couples of random numbers from 1 to limSup.
  function sorting(limSup){
    let array=[];
    for (let i=1;i<=2*limSup;i++){
        let value=(i>limSup)?i-limSup:i;
        array.push(value);
    }
    return array.sort(function(a, b){return 0.5 - Math.random()});
  }
//creates current card object
  function cardObj(whichCard, btn){
      let Card={
      name: whichCard,
      btnObj: btn,
      imgObj: btn.firstChild
    };
    return Card;
  }
//toggling classes to objects
  function toggling(elements, classesArray){
    for (let j=0;j<elements.length;j++){
      for (let i=0;i<classesArray.length;i++){
        elements[j].classList.toggle(classesArray[i]);
      }
    }
  }

  function createDeck(){
    const fragment=document.createDocumentFragment();
    let nameJpg=sorting(8);
    console.log(nameJpg);
    for (let i=0;i<16;i++){
        const btn=document.createElement('button');
        btn.className='logo-bg round-border';
        const cardFlipped=document.createElement('img');
        cardFlipped.setAttribute('src','img/svg/'+nameJpg[i]+'.svg');
        cardFlipped.className='hidden flipped round-border';
        btn.appendChild(cardFlipped);
        fragment.appendChild(btn);
    }
    cardGrid.appendChild(fragment);
  }
  const cardGrid=document.querySelector('.grid');
  createDeck();

  let wasTheFirstCardFlipped=false;
  let firstCardFlipped;
  cardGrid.addEventListener('click', function(e){
    if (e.target.nodeName === 'BUTTON'){
      toggling([e.target],['white-bg', 'logo-bg']);  //flip the card
      e.target.firstChild.classList.toggle('hidden');

      if (!wasTheFirstCardFlipped){
        wasTheFirstCardFlipped=true;
        firstCardFlipped=cardObj('first',e.target);
      }
      else {
          wasTheFirstCardFlipped=false;
          const secondCardFlipped=cardObj('second',e.target);
          const couple=[firstCardFlipped.imgObj, secondCardFlipped.imgObj];
          if (couple[0].getAttribute('src')===couple[1].getAttribute('src')){
          toggling(couple, ['success']);
          //add some animation success
           }
           else {
             toggling(couple, ['hidden']);
             toggling([firstCardFlipped.btnObj,secondCardFlipped.btnObj],['white-bg','logo-bg']);
           }
      }
    }



  });

});
