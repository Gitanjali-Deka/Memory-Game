const cards=document.querySelectorAll('.memory-card');
let hasFlippedCard=false;
let lockBoard=false;
let firstCard,secondCard;

function flipCard(){
    if(lockBoard)return;
    if(this===firstCard)return;
    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard= this;
    }else{
        hasFlippedCard=false;
        secondCard=this;
        checkformatch();
        //do cards match?
       
    }
}
function checkformatch() {
    let match=(firstCard.dataset.framework=== secondCard.dataset.framework);
     match?disablecards():unflipcards();
}

function disablecards(){
    firstCard.removeEventListener('click',flipCard );
    secondCard.removeEventListener('click',flipCard);
}
       
      function unflipcards(){

        lockBoard=true;
        //unflip if not equal by removing flip class
        setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard=false;
       },1500); //timeout for us to be able to see before unflip
    }
function resetBoard(){
    [hasFlippedCard,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
}
(function shuffle(){
    cards.forEach(card=> {
        let randomPos= Math.floor(Math.random()*12);
        card.style.order=randomPos ;
    });

})();// Immediately invoked function expression

cards.forEach(card =>card.addEventListener('click',flipCard))

