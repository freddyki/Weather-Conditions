document.addEventListener("DOMContentLoaded", function() {
    const weathers = ["☀️", "☔", "❄️"];
    const weatherButtons = document.querySelectorAll(".choice");
    const refreshButton = document.getElementById("refreshButton");
    const resultParagraph = document.getElementById("result");
    const rulesParagraph = document.getElementById("rules");
    const userScoreParagraph = document.getElementById("userScore");
    const computerScoreParagraph = document.getElementById("computerScore");

    let userScore = 0;
    let computerScore = 0;

    weatherButtons.forEach(button => {
        button.addEventListener("click", function() {
            const userWeather = this.textContent;
            const computerWeather = weathers[Math.floor(Math.random() * weathers.length)];
            const result = determineWinner(userWeather, computerWeather);
            resultParagraph.textContent = `Computer chose ${computerWeather}. ${result.message}`;
            rulesParagraph.textContent = `Rule: ${result.rule}`;
            updateScore(result);
        });
    });

    refreshButton.addEventListener("click", function() {
        resultParagraph.textContent = "";
        rulesParagraph.textContent = "";
        userScore = 0;
        computerScore = 0;
        userScoreParagraph.textContent = userScore;
        computerScoreParagraph.textContent = computerScore;
    });

    function determineWinner(userWeather, computerWeather) {
        const rules = {
            "☀️☔": "Sun evaporates rain.",
            "☔❄️": "Rain freezes into snow.",
            "❄️☀️": "Snow melts in the sun."
        };
        const key = userWeather + computerWeather;
        const message = determineResultMessage(userWeather, computerWeather);
        return { message, rule: rules[key] || "No specific rule. It's a draw!" };
    }

    function determineResultMessage(userWeather, computerWeather) {
        if (
            (userWeather === "☀️" && computerWeather === "☔") ||
            (userWeather === "☔" && computerWeather === "❄️") ||
            (userWeather === "❄️" && computerWeather === "☀️")
        ) {
            return "You win!";
        } else if (
            (userWeather === "☔" && computerWeather === "☀️") ||
            (userWeather === "❄️" && computerWeather === "☔") ||
            (userWeather === "☀️" && computerWeather === "❄️")
        ) {
            return "Computer wins!";
        } else {
            return "It's a draw!";
        }
    }

    function updateScore(result) {
        if (result.message.includes("win")) {
            if (result.message.includes("You")) {
                userScore++;
                userScoreParagraph.textContent = userScore;
            } else {
                computerScore++;
                computerScoreParagraph.textContent = computerScore;
            }
        }
    }
});
