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
        const card=document.createElement('div');
        card.className='card';
        const cover=document.createElement('img');
        cover.setAttribute('src','https://res-4.cloudinary.com/hireclub/image/upload/c_fill,f_auto,g_north,h_200,q_auto,w_200/pyhntzkpmxmoaaj8ksfu');
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
  const cardGrid=document.querySelector('.grid');
  createDeck();

  let wasTheFirstCardFlipped=false;
  let firstCardFlipped;
  cardGrid.addEventListener('click', function(e){
    if (e.target.nodeName === 'IMG' & !wasTheFirstCardFlipped){



       toggling([e.target.parentNode],['flip']);  //flip the card
      // e.target.firstChild.classList.toggle('animate-out', 'hidden');
      //
      // if (!wasTheFirstCardFlipped){
      //   wasTheFirstCardFlipped=true;
      //   firstCardFlipped=cardObj('first',e.target);
      // }
      // else {
      //     wasTheFirstCardFlipped=false;
      //     const secondCardFlipped=cardObj('second',e.target);
      //     const couple=[firstCardFlipped.imgObj, secondCardFlipped.imgObj];
      //     if (couple[0].getAttribute('src')===couple[1].getAttribute('src')){
      //     toggling(couple, ['success']);
      //     //add some animation success
      //      }
      //      else {
      //        toggling(couple, ['hidden']);
      //        toggling([firstCardFlipped.btnObj,secondCardFlipped.btnObj],['white-bg','logo-bg']);
      //      }
      // }
    }



  });

});
