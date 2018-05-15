document.loaded(function(){
  const fragment=document.createDocumentFragment();
  for (let i=1;i<=16;i++){
      let nameJpg=(i>8)?i-8;i;
      const card=document.createElement('img');
      card.setAttribute('src','img/'+nameJpg+'jpg');
      fragment.appendChild(card);
  }
  const grid=getElementsByClassName('grid');
  grid.appendChild(fragment);
})
