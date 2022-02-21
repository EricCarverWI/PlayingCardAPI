
    var gameDecksHistory = [];   //tracks all decks used since game load
    var gameCardHistory = [];    //tracks all new requested cards
    var handWinHistory = [];
    var flagLiveDeck = false;    //tracks whether a deck has been generated
    var activeHand = false;      //tracks whether hand has been dealt and player is active
    var scoreTabulated = false;  //tracks whether a closed hand had score tracked
    var flagReportWindowClosed = true; 

    var handCounter = 0;
    var counterHuman = 0;
    var counterComputer = 0;

    const handHuman = document.getElementById("you");
    const handComputer = document.getElementById("dealer");

    const resultsHuman = document.getElementById("resultHUM");
    const resultsComputer = document.getElementById("resultCOMP");
    const gamesCounter = document.getElementById("COUNT");

    var scoreHuman = document.getElementById("HUMW");
    scoreHuman.innerText = 0;
    var scoreComputer = document.getElementById("COMPW");
    scoreComputer.innerText = 0;

//Generate an API deck and saves WHOLE DECK to Array
    const generateNewDeck = async () => {
            //new object for storage
            let newDeck = {};
            document.getElementById("deckButton").innerText = 'Obtaining new deck Plz Wait..';
            try {
                const res = await fetch (`https://www.deckofcardsapi.com/api/deck/new/draw/?count=52`);
                newDeck = await res.json();
                gameDecksHistory.unshift(newDeck);
                console.log ("this is the newDeck:", newDeck);
                document.getElementById("deckButton").innerText = (`SUCCESS: deck#: ${gameDecksHistory[0].deck_id}, cards left: ${gameDecksHistory[0].cards.length} ***`);
                flagLiveDeck = true;  //Ready to play
            }catch(err){
                console.log (err);
            }
    };

    function GenerateNewGame(){
        if (flagLiveDeck === true && gameDecksHistory[0].cards.length > 25){       //only allows a deal IF API works
            activeHand = true;
            scoreTabulated = false;
            handCounter +=1;
            document.getElementById("resultHUM").innerHTML = "";
            document.getElementById("resultCOMP").innerHTML = "";
            document.getElementById("COUNT").innerHTML = handCounter;
            document.getElementById("dealer").value = 0;
            document.getElementById("you").value = 0;

            let cardDealerNEWFirst = returnNewCardFromDeck();
            console.log (`This is after the first dealer card: ${cardDealerNEWFirst.code}`);
            let cardHumanNEWFirst = returnNewCardFromDeck();
            console.log ("This is after the first human card: ", cardHumanNEWFirst.code);

            let cardHumanNEWSecond = returnNewCardFromDeck();
            console.log ("This is after the second human card: ", cardHumanNEWSecond.code);

            document.getElementById("dealer").value = returnNewCardValue(cardDealerNEWFirst);                //cardDealerFirst;
            document.getElementById("'dealerArr").value = (`[${returnNewCardInitial(cardDealerNEWFirst)}${returnNewCardSuit(cardDealerNEWFirst)}]`);   //(`[${cardDealerFirst}]`);
            document.getElementById("you").value = returnNewCardValue(cardHumanNEWFirst) + returnNewCardValue(cardHumanNEWSecond); //cardHumanFirst + cardHumanSecond;
            document.getElementById("'yourArr").value = (`[${returnNewCardInitial(cardHumanNEWFirst)}${returnNewCardSuit(cardHumanNEWFirst)}] [${returnNewCardInitial(cardHumanNEWSecond)}${returnNewCardSuit(cardHumanNEWSecond)}]`);
///////BLACKJACK TEST
            if (document.getElementById("you").value == "21"){
                counterHuman += 1;
                activeHand = false;
                document.getElementById("resultHUM").innerHTML = "YOU WIN!";
                document.getElementById("resultCOMP").innerHTML = "BLACKJACK!!";
                scoreTabulated = true;
                tabulateHandHistory();
            }
        }
    }

    function HUMAN(){
        if (activeHand===true){
            let humanNewCard = returnNewCardFromDeck();
            console.log (`This is after the NEW humanNewCard: ${humanNewCard.code}`);
    
//checks to see if the next card is an Ace value 11 and would break them - if so reduce ace to Ace value 01
            let newCardValue = returnNewCardValue(humanNewCard);
            if (newCardValue===11 && Number(document.getElementById("you").value)>10){
                newCardValue = 1;
            }
    
            document.getElementById("you").value = Number(document.getElementById("you").value) + newCardValue;  //newCard;
            document.getElementById("'yourArr").value += (` [${returnNewCardInitial(humanNewCard)}${returnNewCardSuit(humanNewCard)}]`);     //(` [${newCard}]`);
            if(document.getElementById("you").value > 21){
                counterComputer += 1;
                document.getElementById("COMPW").innerHTML = counterComputer;
                document.getElementById("resultCOMP").innerHTML = "PC WIN";
                document.getElementById("resultHUM").innerHTML = "YOU BUSTED";
                activeHand = false;
                scoreTabulated=true;
                tabulateHandHistory();
            }
        }
    }

    function COMPUTER(){
        if (activeHand===true){
            while(document.getElementById("dealer").value < 17){
                let computerNewCard = returnNewCardFromDeck();
                console.log (`This is after the NEW computer card: ${computerNewCard.code}`);

//checks to see if the next card is an Ace value 11 and would break them - if so reduce ace to Ace value 01
                let newCardValue = returnNewCardValue(computerNewCard);
                if (newCardValue===11 && Number(document.getElementById("you").value)>10){
                    newCardValue = 1;
                }                
                document.getElementById("dealer").value = Number(document.getElementById("dealer").value) + newCardValue; //newCard;
                document.getElementById("'dealerArr").value += (` [${returnNewCardInitial(computerNewCard)}${returnNewCardSuit(computerNewCard)}]`);          //(` [${newCard}]`);
            }
        }
        activeHand = false;
    }

    function determineWinner(){
        if (activeHand===false && scoreTabulated===false){
            var a = parseInt(document.getElementById("you").value);
            var b = parseInt(document.getElementById("dealer").value);
            scoreTabulated = true;
            if(b > 21){
                counterHuman += 1;
                document.getElementById("HUMW").innerHTML = counterHuman;
                document.getElementById("resultHUM").innerHTML = "YOU WIN";
                tabulateHandHistory();
                return;
            } else if(a==b){
                counterHuman += 0.5;
                counterComputer += 0.5;
                document.getElementById("HUMW").innerHTML = counterHuman;
                document.getElementById("COMPW").innerHTML = counterComputer;
                document.getElementById("resultHUM").innerHTML = "TIE";
                document.getElementById("resultCOMP").innerHTML = "TIE";
                tabulateHandHistory();
            } else if(a>b){
                counterHuman += 1;
                document.getElementById("HUMW").innerHTML = counterHuman;
                document.getElementById("resultHUM").innerHTML = "YOU WIN";
                tabulateHandHistory();
            } else if(b>a){
                counterComputer += 1;
                document.getElementById("COMPW").innerHTML = counterComputer;
                document.getElementById("resultCOMP").innerHTML = "PC WIN";
                tabulateHandHistory();
            }
        }
    }

    function returnNewCardFromDeck(){
        let newCardObj = gameDecksHistory[0].cards.pop();
        document.getElementById("deckButton").innerText = (`IN PLAY: deck#: ${gameDecksHistory[0].deck_id}, cards left: ${gameDecksHistory[0].cards.length} ***`);
        return newCardObj;
    }

    function returnNewCardValue(obj){
        switch (obj.value){
            case "ACE": return 11;
            case "KING": return 10;
            case "QUEEN": return 10;
            case "JACK": return 10;
            case "10": return 10;
            case "9": return 9;
            case "8": return 8;
            case "7": return 7;
            case "6": return 6;
            case "5": return 5;
            case "4": return 4;
            case "3": return 3;
            case "2": return 2;
            case "1": return 1;
            default: return -1;
        }
    }

    function returnNewCardInitial(obj){
        switch (obj.value){
            case "ACE": return "A";
            case "KING": return "K";
            case "QUEEN": return "Q";
            case "JACK": return "J";
            case "10": return "10";
            case "9": return "9";
            case "8": return "8";
            case "7": return "7";
            case "6": return "6";
            case "5": return "5";
            case "4": return "4";
            case "3": return "3";
            case "2": return "2";
            case "1": return "1";
            default: return -1;
        }
    }

    function returnNewCardSuit(obj){
        switch (obj.suit){
            case "CLUBS": return "♣";
            case "HEARTS": return "♥";
            case "DIAMONDS": return "♦";
            case "SPADES": return "♠";
            default: return -1;
        }
    }

    function generateReport(){
        if (flagReportWindowClosed == true){
            document.getElementById("reportDiv").innerText = "";

            handWinHistory.forEach(element => {
                document.getElementById("reportDiv").innerText += element;
            });
            
            //"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.";
            document.getElementById("reportButton").innerText = "click to retract report info!";
            flagReportWindowClosed = false;
        } else {
            document.getElementById("reportButton").innerText = "click to expand report info!";
            document.getElementById("reportDiv").innerText = "";
            flagReportWindowClosed = true;
        }
    }

    function tabulateHandHistory(){
        handWinHistory.unshift(`${gameDecksHistory[0].deck_id}> \n\thuman: ${Number(document.getElementById("you").value)}-${document.getElementById("'yourArr").value} \n\t\tvs \n\t\t\tcomputer: ${document.getElementById("dealer").value}-${document.getElementById("'dealerArr").value}\n\n`);
    }

