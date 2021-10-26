let wordList=["APPLE","BANANA","HELLO","WORLD","CAT","DOG","BEYOND","SECRET","HANGMAN"] ; //list of secret word
let secretWord=wordList[Math.floor(Math.random()*wordList.length)]//ramdom choose secret word
let lettersGuessed="";
let num=6;//number of guesses


getGuessedWord=function getGuessedWord(secretWord, lettersGuessed){
    /*
    secretWord: string, the word the user is guessing
    lettersGuessed: string, what letters have been guessed so far
    returns: string, comprised of letters and underscores 
         that represents what letters in secretWord have been guessed so far.
    */
    let reply="";
    for(let index in secretWord){
        if (lettersGuessed.search(secretWord.charAt(index)) !== -1)
        {
            reply=reply+secretWord.charAt(index);
        }
        else
        {
            reply=reply+'_ ';
        }
    }
    return reply  
}

isWordGuessed=function isWordGuessed(secretWord, lettersGuessed){
    /*
    return: boolean
    true, if guessed the right word
    false, otherwise
    */
    let bo = true;
    for (let index in secretWord){
        if(lettersGuessed.search(secretWord.charAt(index)) === -1){
            bo = false;
        }
    }
    return bo
}
getAvailableLetters=function getAvailableLetters(lettersGuessed){
    /*
    lettersGuessed: String, what letters have been guessed so far
    returns: string, comprised of letters that represents what letters have not
    yet been guessed.
    */
    let reply=""
    let a="abcdefghijklmnopqrstuvwxyz";
    for (let index in a){
        if (lettersGuessed.search(a.charAt(index)) === -1)
            reply=reply+a.charAt(index);}
    return reply
}

isGameOver = function isGameOver(){
    /* if number of guess is 0, and user has not guessed the right word, show GAME IS OVER
    else if user guessed the right word, show YOU WIN.
    */
    if((isWordGuessed(secretWord, lettersGuessed) !== true) && num === 0){
        document.getElementById("result_hangman").innerHTML="<strong>Game over!";
        let img='<img src="../assets/images/imgForGames/hangman1.png" alt="lose_hangman" id="lose_hangman">';
        document.getElementById("pic").innerHTML=img;
    }else if((isWordGuessed(secretWord, lettersGuessed) === true)){
        document.getElementById("result_hangman").innerHTML="<strong>Congratulations, you win!";
        let img='<img src="../assets/images/imgForGames/hangman2.png" alt="win_hangman" id="win_hangman">';
        document.getElementById("pic").innerHTML=img;
    }
}

hide = function hide(){
    //hide keyboard before start
    let x = document.getElementsByClassName("letterButton");
    let i;
    for (i = 0; i < x.length; i++) {
      x[i].style.visibility = "hidden";
    }
  }
show = function show(){
    //show keyboard after start
    let x = document.getElementsByClassName("letterButton");
    for (i = 0; i < x.length; i++){
        x[i].style.visibility="visible";
    }
}


start=function start(){
    //start the game
    document.getElementById("line1").innerHTML="Welcome to the game, <strong>Hangman!";
    document.getElementById("line2").innerHTML="I am thinking of a word that is "+secretWord.length+" letters long.";
    document.getElementById("number").innerHTML="You have "+num+" guessed left.";
    //document.getElementById("line3").innerHTML="You have &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp guesses left.";
    document.getElementById("showGuessedWord").innerHTML=getGuessedWord(secretWord, lettersGuessed);
}

guess = function guess(letter){
    //show result after click a letter
    //if letter is in secret word, update guessed word
    //if letter has been chosed before, alert
    //if letter is not in secret word, number of guess left -1
    if((isWordGuessed(secretWord, lettersGuessed) !== true) && num !== 0){
        if (lettersGuessed.search(letter) !== -1){
            document.getElementById("returnGuess").innerHTML="You've already guessed that letter";
        }   
        else{
            lettersGuessed+=letter;       
            if(secretWord.search(letter) !== -1){
                document.getElementById("returnGuess").innerHTML="Good guess!";
                document.getElementById("showGuessedWord").innerHTML=getGuessedWord(secretWord, lettersGuessed);
            }
            else if(secretWord.search(letter) === -1){
                document.getElementById("returnGuess").innerHTML="Oops! That letter is not in my word.";
                document.getElementById("showGuessedWord").innerHTML=getGuessedWord(secretWord, lettersGuessed);
                num-=1;
                document.getElementById("number").innerHTML="You have "+num+" guessed left.";
                draw();
            }
        }
    }
}

function draw() {
    //too long !!!!could be improved in future!!
    //------------------------------------------------------
    let canvas = document.getElementById('canvas_hangman');
    if (canvas.getContext)
    {
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#006699";
        ctx.lineWidth = 4;
        if(num===5)
        {
            ctx.beginPath();
            ctx.moveTo(50,25);
            ctx.lineTo(220,25);
            ctx.lineTo(220,300);
            ctx.lineTo(50,300); 
            ctx.stroke();

        } 
        else if(num === 4)
        {
            ctx.beginPath();
            ctx.moveTo(50,25);
            ctx.lineTo(220,25);
            ctx.lineTo(220,300);
            ctx.lineTo(50,300);
            ctx.moveTo(100,25);
            ctx.lineTo(100,100);
            ctx.stroke();
        }
        else if (num === 3){
            ctx.beginPath();
            ctx.moveTo(50,25);
            ctx.lineTo(220,25);
            ctx.lineTo(220,300);
            ctx.lineTo(50,300);
            ctx.moveTo(100,25);
            ctx.lineTo(100,100);         
            ctx.arc(100,150,40,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(85,145);
            ctx.arc(85,145,2,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(110,145);
            ctx.arc(110,145,2,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(93,160);
            ctx.lineTo(104,160);
            ctx.stroke(); 
        }
        else if(num===2)
        {
            ctx.beginPath();
            ctx.moveTo(50,25);
            ctx.lineTo(220,25);
            ctx.lineTo(220,300);
            ctx.lineTo(50,300);
            ctx.moveTo(100,25);
            ctx.lineTo(100,100);         
            ctx.arc(100,150,40,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(85,145);
            ctx.arc(85,145,2,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(110,145);
            ctx.arc(110,145,2,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(93,160);
            ctx.lineTo(104,160);
            ctx.moveTo(100,190);
            ctx.lineTo(70,225);
            ctx.stroke();
        }
        else if(num===1)
        {
            ctx.beginPath();
            ctx.beginPath();
            ctx.moveTo(50,25);
            ctx.lineTo(220,25);
            ctx.lineTo(220,300);
            ctx.lineTo(50,300);
            ctx.moveTo(100,25);
            ctx.lineTo(100,100);         
            ctx.arc(100,150,40,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(85,145);
            ctx.arc(85,145,2,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(110,145);
            ctx.arc(110,145,2,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(93,160);
            ctx.lineTo(104,160);
            ctx.moveTo(100,190);
            ctx.lineTo(70,225);
            ctx.moveTo(100,190);
            ctx.lineTo(134,232);
            ctx.stroke();
        }
        else if(num ===0)
        {
            ctx.beginPath();
            ctx.moveTo(50,25);
            ctx.lineTo(220,25);
            ctx.lineTo(220,300);
            ctx.lineTo(50,300);
            ctx.moveTo(100,25);
            ctx.lineTo(100,100); 
            ctx.arc(100,150,40,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(85,145);
            ctx.arc(85,145,2,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(110,145);
            ctx.arc(110,145,2,1.5*Math.PI,1.49*Math.PI);
            ctx.moveTo(93,160);
            ctx.lineTo(104,160);
            ctx.moveTo(100,190);
            ctx.lineTo(70,225);         
            ctx.moveTo(100,190);
            ctx.lineTo(134,232);          
            ctx.moveTo(85,205);
            ctx.lineTo(88,270);
            ctx.moveTo(111,205);
            ctx.lineTo(115,276);
            ctx.stroke();
            
        }   
    }
}
