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

  function toggling(element, classesArray){
    for (let i=0;i<classesArray.length;i++){
      element.classList.toggle(classesArray[i]);
    }
  }

  function storingImgName(Img){
    return Img.getAttribute('src');
  }

  function guess(couple, successOrFail){
      for (let i=0;i<couple.length;i++){
        couple[i].classList.toggle(successOrFail);
      }
  }

  function createDeck(){
    const fragment=document.createDocumentFragment();
    let nameJpg=sorting(8);
    console.log(nameJpg);
    for (let i=0;i<16;i++){
        const btn=document.createElement('button');
        HTMLButtonElement.type='button';
        btn.className='card logo-bg';
        const cardFlipped=document.createElement('img');
        cardFlipped.setAttribute('src','img/svg/'+nameJpg[i]+'.svg');
        cardFlipped.className='hidden flipped';
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
      const coveredCard=e.target;
      const flippedCard=coveredCard.firstChild;
      toggling(coveredCard,['white-bg', 'logo-bg']);
      flippedCard.classList.toggle('hidden');
      if (!wasTheFirstCardFlipped){
        firstCardFlipped=storingImgName(flippedCard);
        // flippedCard.classList.toggle('first');
        // coveredCard.classList.toggle('first');
        wasTheFirstCardFlipped=true;
      }
      else {
          const secondImgValue=storingImgName(flippedCard);
          wasTheFirstCardFlipped=false;
          if (firstCardFlipped===secondImgValue){
          const couple=document.querySelectorAll('img[src="'+firstCardFlipped+'"]');
          guess(couple, 'success');
          }
          else {
            //animation fail
            const firstFlippedCard=document.querySelector('img[src="'+firstCardFlipped+'"]');
            const couple=[firstFlippedCard, flippedCard];
            console.log(couple);
            guess(couple, 'hidden');
            const btnOfCouple=[];
            for (let i=0; couple.length;i++){
              btnOfCouple.push(couple[i].parentNode);
            }
            console.log(btnOfCouple);
            toggling(flippedFirstCard[1], ['hidden']);
            toggling(flippedFirstCard[0],['white-bg', 'logo-bg']);
            toggling(flippedCard, ['hidden']);
            toggling(coveredCard, ['white-bg', 'logo-bg']);
          }

      }
    }



  })

});
