
    var activeHand = false;
    var scoreTabulated = false;
    const handHuman = document.getElementById("you");
    const handComputer = document.getElementById("dealer");

    const resultsHuman = document.getElementById("resultHUM");
    const resultsComputer = document.getElementById("resultCOMP");
    const gamesCounter = document.getElementById("COUNT");

    var scoreHuman = document.getElementById("HUMW");
    scoreHuman.innerText = 0;
    var scoreComputer = document.getElementById("COMPW");
    scoreComputer.innerText = 0;

    var handCounter = 0;
    var counterHuman = 0;
    var counterComputer = 0;

    
    function getACard(){
        card = Math.floor(Math.random() * 13) + 1
            if(card == 1){
                card = 11;
            } else if(card > 10){
                card = 10;
            }
            return Number(card);
        }

        function GenerateNewGame(){
            activeHand = true;
            scoreTabulated = false;
            handCounter +=1;
            document.getElementById("resultHUM").innerHTML = "";
            document.getElementById("resultCOMP").innerHTML = "";
            document.getElementById("COUNT").innerHTML = handCounter;
            document.getElementById("dealer").value = 0;
            document.getElementById("you").value = 0;
            document.getElementById("dealer").value = Number(document.getElementById("dealer").value) + Number(getACard());
            document.getElementById("you").value = Number(document.getElementById("you").value) + Number(getACard());
        }

        function COMPUTER(){
            if (activeHand===true){
                while(document.getElementById("dealer").value < 17){
                    let newCard = Number(getACard());
                    if (newCard === 11 && document.getElementById("dealer").value >10){
                        newCard = 1;
                    }
                    document.getElementById("dealer").value = Number(document.getElementById("dealer").value) + newCard;
                }
            }
            activeHand = false;
        }

        function HUMAN(){
            if (activeHand===true){
                let newCard = Number(getACard());
                if (newCard === 11 && document.getElementById("you").value > 10){
                    newCard = 1;
                }
                document.getElementById("you").value = parseInt(document.getElementById("you").value) + newCard;
                if(document.getElementById("you").value > 21){
                    counterComputer += 1;
                    document.getElementById("COMPW").innerHTML = counterComputer;
                    document.getElementById("resultCOMP").innerHTML = "PC WIN";
                    document.getElementById("resultHUM").innerHTML = "YOU BUSTED";
                    activeHand = false;
                    scoreTabulated=true;
                }
            }
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
                    return;
                } else if(a==b){
                    counterHuman += 0.5;
                    counterComputer += 0.5;
                    document.getElementById("HUMW").innerHTML = counterHuman;
                    document.getElementById("COMPW").innerHTML = counterComputer;
                    document.getElementById("resultHUM").innerHTML = "TIE";
                    document.getElementById("resultCOMP").innerHTML = "TIE";
                } else if(a>b){
                    counterHuman += 1;
                    document.getElementById("HUMW").innerHTML = counterHuman;
                    document.getElementById("resultHUM").innerHTML = "YOU WIN";
                } else if(b>a){
                    counterComputer += 1;
                    document.getElementById("COMPW").innerHTML = counterComputer;
                    document.getElementById("resultCOMP").innerHTML = "PC WIN";
                }
            }
        }