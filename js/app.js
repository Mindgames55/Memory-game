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

  const fragment=document.createDocumentFragment();
  let nameJpg=sorting(8);
  for (let i=0;i<16;i++){
      const btn=document.createElement('button');
      HTMLButtonElement.type='button';
      btn.className='card';
      //creates the cover of the card
      const cardCover=document.createElement('img');
      cardCover.setAttribute('src','https://res-4.cloudinary.com/hireclub/image/upload/c_fill,f_auto,g_north,h_200,q_auto,w_200/pyhntzkpmxmoaaj8ksfu');
      cardCover.className='cover';
      btn.appendChild(cardCover);
      //create the img element when you flip the card
      const cardFlipped=document.createElement('img');
      cardFlipped.setAttribute('src','img/svg/'+nameJpg[i]+'.svg');
      cardFlipped.className='hidden flipped';
      btn.appendChild(cardFlipped);

      fragment.appendChild(btn);
  }
  const cardGrid=document.getElementsByClassName('grid');
  cardGrid[0].appendChild(fragment);

  let firstCardFlipped=false;
  cardGrid[0].addEventListener('click', function(e){
    if (e.target.nodeName === 'IMG' & e.target.getAttribute('class')==='cover'){
      const coveredCard=e.target;
      const flippedCardlist=coveredCard.parentNode.getElementsByClassName('flipped');
      const flippedCard=flippedCardlist[0];
      coveredCard.classList.toggle('hidden');
      flippedCard.classList.toggle('hidden');
      let flippedImgValue='';
      if (!firstCardFlipped){
        console.log('1 time');
        flippedImgValue= flippedCard.getAttribute('src');
        flippedCard.classList.toggle('first');
        firstCardFlipped=true;
      }
      else {
          const secondImgValue=flippedCard.getAttribute('src');
          firstCardFlipped=false;
          if (flippedImgValue===secondImgValue){
            //animation success
            console.log('success');
          }
          else {
            //animation fail
            console.log('fail');
            const firstBtn=document.getElementsByClassName('first');
            const btnChildrenFirst=firstBtn[0].parentNode.children;
            const btnChildrenSecond=flippedCard.parentNode.children;

            for (let i=0;i<btnChildrenFirst.length;i++){
              btnChildrenFirst[i].classList.toggle('hidden');
              btnChildrenSecond[i].classList.toggle('hidden');
            }


          }
      }
    }



  })

});
