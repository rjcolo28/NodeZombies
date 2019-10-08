var inquirer = require("inquirer");

// set player and zombie health levels
var playerHealth = 75
var zombieHealth = 25

// generic function to check if player won or lost
function check() {

    console.log("");
    console.log("");

    if (playerHealth <= 0) {
        // message
        console.log("--------------------");
        console.log("");
        console.log("DEAD");
        console.log("");
        console.log("--------------------");

        // Exit game/end session
        process.exit();
    }

    if (zombieHealth <= 0) {
        // message
        console.log("--------------------");
        console.log("");
        console.log("You've killed the zombie for good! You're safe...for now.");
        console.log("");
        console.log("--------------------");

        // Exit game/end session
        process.exit();
    }

    playRound();
}


function playRound() {
    
    inquirer.prompt([
        {
            type: "list",
            name: "playerGuess",
            message: "The zombie outbreak has officially begun! Try to stay alive by guessing a number between 1 and 5!",
            choices: ["1", "2", "3", "4", "5"]
        }
    ]).then(function(guess) {
        // health check
        if (playerHealth > 0 || zombieHealth > 0) {
            // player and zombie damage values
            var damage = Math.floor((Math.random() * 5)) + 1;

            // zombie damage message
            var zombieDam = Math.floor((Math.random() * 5)) + 1;
            console.log("");
            console.log("");
            console.log("Zombie rolled " + zombieDam);

            if (zombieDam === parseInt(guess.playerGuess)) {
                // Subtract damage amount from zombie
                zombieHealth -= damage;

                // Status message
                console.log("You hit the zombie for " + damage + " points. That's alotta damage!");
                console.log("You have " + playerHealth + " health left. The zombie has " + zombieHealth + " health left.")

                // game over check
                check();
            }
            else {
                // Subtract damage amount from player
                playerHealth -= damage;

                // Status message
                console.log("Uh oh! The zombie got ya for " + damage + " damage.")
                console.log("You have " + playerHealth + " health left. The zombie has " + zombieHealth + " health left.")

                // game over check
                check();
            }
        }
    });
}

playRound();
