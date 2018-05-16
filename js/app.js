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
      const card=document.createElement('button');
      HTMLButtonElement.type='button';
      card.className='card';
      const cardImg=document.createElement('img');
      cardImg.setAttribute('src','img/svg/'+nameJpg[i]+'.svg');
      cardImg.className='hidden';
      card.appendChild(cardImg);
      const cardUncover=document.createElement('img');
      cardUncover.setAttribute('src','https://res-4.cloudinary.com/hireclub/image/upload/c_fill,f_auto,g_north,h_200,q_auto,w_200/pyhntzkpmxmoaaj8ksfu');
      cardUncover.className='visible';
      card.appendChild(cardUncover);
      fragment.appendChild(card);
  }
  const cardGrid=document.getElementsByClassName('grid');
  cardGrid[0].appendChild(fragment);


  cardGrid[0].addEventListener('click', function(e){
    if (e.target.nodeName === 'BUTTON'){
      const coverCard=e.target.firstChild;
      const flippedCard=e.target.lastChild;
      coverCard.classList.toggle('hidden');
      flippedCard.classList.toggle('hidden');
    }

  })

});
