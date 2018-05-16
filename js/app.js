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
      card.appendChild(cardImg);
      fragment.appendChild(card);
  }
  const cardGrid=document.getElementsByClassName('grid');
  cardGrid[0].appendChild(fragment);

});
