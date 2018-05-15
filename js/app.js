document.addEventListener('DOMContentLoaded', function(){
  const fragment=document.createDocumentFragment();
  for (let i=1;i<=16;i++){
      let nameJpg=(i>8)?i-8:i;
      const card=document.createElement('img');
      card.setAttribute('src','img/svg/'+nameJpg+'.svg');
      fragment.appendChild(card);
  }
  const cardGrid=document.getElementsByClassName('grid');
  cardGrid[0].appendChild(fragment);
});
