wordList=["arctic","balaclava","blanket","blizzard","boots","chill","chimney","eggnog","evergreen","fireplace","firewood","flannel",
"fleece","flu","flurries","fog","freezing","frigid","frostbite","frostbitten","frosty","frozen","fruitcake","furnace","gale","gingerbread","glacial","glacier",
"gloves","gust","hailstone","harsh","heat","heater","hibernate","hockey","hoodie","hypothermia","ice","iceberg","icicle","icy","insulation","jacket","January",
"log","longjohns","luge","melt","mittens","muffler","nippy","overcast","overcoat","overshoes","parka","pinecone","polar","pullover","quilt","radiator","raw",
"reindeer","scarf","shiver","skate","ski","sled","sledge","sleet","slippery","slush","sneeze","sniffle","snowball","snowbound","snowfall","snowflake","snowman",
"snowplow","snowstorm","snowy","socks","solstice","storm","stove","sugarplum","sweater","thaw","thermometer","toboggan","turtleneck","whiteout","wind","windy",
"winter","wintertime","wintry","wool"]

//Variables
var secretword = "";
var secretwordUnique = [];
var guessesSoFar = [];
var guessesLeft = 0;
var wins = 0;
var won = false;
var correctGuesses = [];

var secretwordText = document.getElementById("secretword");
var guessesSoFarText = document.getElementById("guessesSoFar");
var guessesLeftText = document.getElementById("guessesLeft");
var winsText = document.getElementById("wins");

//Functions
function resetGame(){
    guessesLeft = 0;
    guessesSoFar = [];
    secretword = wordList[Math.floor(Math.random() * wordList.length)];
    won = false;
    guessesLeft = secretword.length + 5;
    writeCurrent();
}

function writeCurrent (){
    var secretwordDOM = [];
    for (var i = 0; i < secretword.length; i++){
        if (guessesSoFar.includes(secretword[i])){
            secretwordDOM.push(secretword[i].toUpperCase());
        } else {
            secretwordDOM.push(" _ ");
        };
    }
    
    secretwordText.textContent = secretwordDOM.join(" ");
    guessesSoFarText.textContent = "Letters Guessed: " + guessesSoFar.join(" ").toUpperCase();
    guessesLeftText.textContent = "Incorrect Guesses Left: " + guessesLeft;
    winsText.textContent = "Wins: " + wins;
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

//computer chooses and guesses set
secretword = wordList[Math.floor(Math.random() * wordList.length)];
guessesLeft = secretword.length + 5;
secretwordUnique = secretword.split('');
secretwordUnique = secretwordUnique.filter(onlyUnique);

//Word shows on DOM with letters hidden
writeCurrent();
//Player guess a letter
document.onkeyup = function(event) {
    userGuess = event.key;
    //Check that letter hasn't been guessed
    if (guessesSoFar.includes(userGuess)){
        //If letter has been guessed do nothing
        return;
    } else{
        //check guess
        guessesSoFar.push(userGuess);
        if (secretword.includes(userGuess)){
            correctGuesses.push(userGuess);
            //if correct check if all letters guessed
            for (var i = 0; i < secretword.length; i++){
                if (guessesSoFar.includes(secretword[i])){
                    writeCurrent();
                    if (guessesSoFar.length === secretwordUnique.length) {
                        writeCurrent();
                        wins ++;
                        alert("You win! The secret word is " + secretword + ".");
                        resetGame(); 
                    }
                } else {
                    writeCurrent();
                }};
        } else {
            //if incorrect
            guessesLeft --;
            if (guessesLeft === 0){
                alert("You lost! The secret word was " + secretword + ".");
                resetGame();
            }
            writeCurrent();
        };}
};