const url = 'https://api.quotable.io/random';
const quoteContainer = document.getElementById('quote-container');
const inputTextContainer = document.getElementById('input-text');
const timerElement = document.getElementById('timer-element');

inputTextContainer.addEventListener('input',function(){
    
    const arrayQuote = document.querySelectorAll('span');
    console.log(arrayQuote);
    const arrayValue = inputTextContainer.value.split('');
    if(arrayValue.length>0 && arrayValue.length<2){
        setTimer();
    }
    
    arrayQuote.forEach((characterSpan,index) => {
        
        const character = arrayValue[index];
        if(character == null){
            characterSpan.classList.remove('incorrect');
        }
        
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct');
           
        }
        else{          
            characterSpan.classList.add('incorrect');         
        }
    })
    if(arrayValue.length === arrayQuote.length){
        inputTextContainer.setAttribute('disabled','');
        fetchQuoteFromApi();
    }
    
})
const fetchQuoteFromApi = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const quote = data.content;
    quoteDisplay(quote);
}
fetchQuoteFromApi();

function quoteDisplay(quote){
    quoteContainer.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteContainer.appendChild(characterSpan);
    });
    inputTextContainer.value = null;
    inputTextContainer.removeAttribute('disabled','');
}

let startTime;
function setTimer(){
    timerElement.innerText = 0;
    startTime = new Date();

    setInterval(()=>{
        timerElement.innerText = getTimerTime();
    },1000)
}
function getTimerTime(){
    return Math.floor((new Date()-startTime)/1000);
}