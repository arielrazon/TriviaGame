var QuizArea = $("#quiz-area");

// Question set
var triviaQuestions = [
    {
        question: "What Canadian province seperates Alaska from the United States?",
        answers: ["British Columbia", "Alberta", "Saskatchewan", "Quebec"],
        correctAnswer: "British Columbia"
    },
    {
        question: "Which of these countries borders Paraguay?",
        answers: ["Venezuela", "Cuba", "Colombia", "Argentina"],
        correctAnswer: "Argentina"
    },
    {
        question: "Which of the following is an overseas possession of France?",
        answers: ["Aruba", "Puerto Rico", "New Caledonia", "Nova Scotia"],
        correctAnswer: "New Caledonia"
    },
    {
        question: "What U.S. State was Abraham Lincoln from?",
        answers: ["Illinois", "Kentucky", "Indiana", "Minnesota"],
        correctAnswer: "Kentucky"
    },
    {
        question: "Which of these was the first permanent British colony in North America?",
        answers: ["Jamestown, VA", "St. Augustine, FL", "Plymouth, MA", "Bermuda"],
        correctAnswer: "Jamestown, VA"
    },
    {
        question:
            "Which of these was the first permanent Spanish colony in what is currently the U.S.?",
        answers: ["St. Augustine, FL", "Albuquerque, NM", "Los Angeles, CA", "Houston, TX"],
        correctAnswer: "St. Augustine, FL"
    },
    {
        question: "Which Native American civilization was conquered by Hernan Cortés?",
        answers: ["Incas", "Iroquois", "Seminole", "Aztecs"],
        correctAnswer: "Aztecs"
    },
    {
        question: "What is the predominant religion in Israel?",
        answers: ["Islam", "Baha'i Faith", "Judaism", "Christianity"],
        correctAnswer: "Judaism"
    }
];

// Variable that will hold the setInterval
var timer;

var game = {
    correct: 0,
    incorrect: 0,
    counter: 120,
    countdown: function () {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("TIME UP");
            game.done();
        }
    },

    start: function () {
        timer = setInterval(game.countdown, 1000);

        $("#sub-wrapper").prepend(
            "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
        );

        $("#start").remove();

        for (var i = 0; i < triviaQuestions.length; i++) {
            QuizArea.append("<h2>" + triviaQuestions[i].question + "</h2>");
            for (var j = 0; j < triviaQuestions[i].answers.length; j++) {
                QuizArea.append("<input type='radio' name='question-" + i +
                    "' value='" + triviaQuestions[i].answers[j] + "''>" + triviaQuestions[i].answers[j]);
            }
        }

        QuizArea.append("<button id='done'>Done</button>");
    },

    done: function () {
        var inputs = QuizArea.children("input:checked");
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).val() === triviaQuestions[i].correctAnswer) {
                game.correct++;
            } else {
                game.incorrect++;
            }
        }
        this.result();
    },

    result: function () {
        clearInterval(timer);

        $("#sub-wrapper h2").remove();

        QuizArea.html("<h2>All Done!</h2>");
        QuizArea.append("<h3>Correct Answers: " + this.correct + "</h3>");
        QuizArea.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    }
};

// CLICK EVENTS

$(document).on("click", "#start", function () {
    game.start();
});

$(document).on("click", "#done", function () {
    game.done();
});
