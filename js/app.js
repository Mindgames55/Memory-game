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

  const fragment=document.createDocumentFragment();
  let nameJpg=sorting(8);
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
  const cardGrid=document.querySelector('.grid');
  cardGrid.appendChild(fragment);

  let firstCardFlipped=false;
  cardGrid.addEventListener('click', function(e){
    if (e.target.nodeName === 'BUTTON'){
      const coveredCard=e.target;
      const flippedCard=coveredCard.firstChild;
      toggling(coveredCard,['white-bg', 'logo-bg']);
      flippedCard.classList.toggle('hidden');
      if (!firstCardFlipped){
        flippedCard.classList.toggle('first');
        coveredCard.classList.toggle('first');
        firstCardFlipped=true;
      }
      else {
          const flippedFirstCard=document.querySelectorAll('.first');
          const flippedImgValue=flippedFirstCard[1].getAttribute('src');
          const secondImgValue=flippedCard.getAttribute('src');
          firstCardFlipped=false;
          if (flippedImgValue===secondImgValue){
            //animation success
            toggling(flippedFirstCard[0],['success']);
            toggling(coveredCard, ['success'])
            console.log('success');
          }
          else {
            //animation fail
            console.log('fail');
            toggling(flippedFirstCard[1], ['hidden']);
            toggling(flippedFirstCard[0],['white-bg', 'logo-bg']);
            toggling(flippedCard, ['hidden']);
            toggling(coveredCard, ['white-bg', 'logo-bg']);
          }
          for (let i=0;i<flippedFirstCard.length;i++){
            flippedFirstCard[i].classList.remove('first');
          }
      }
    }



  })

});
