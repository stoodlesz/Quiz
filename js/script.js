// intialized the animate on scroll library
function addActive(clicked_id) {
  removeActive();
  element = document
    .getElementById(clicked_id)
    .getElementsByClassName("cd-dot")[0];
  console.log(element);
  element.classList.add("active-section");
}

function removeActive() {
  element = document.getElementsByClassName("active-section")[0];
  element.classList.remove("active-section");
}

var Quiz = function () {
  var self = this;
  this.init = function () {
    self._bindEvents();
  };

  this.correctAnswers = [
    { question: 1, answer: "b" },
    { question: 2, answer: "b" },
    { question: 3, answer: "d" },
    { question: 4, answer: "c" },
    { question: 5, answer: "d" },
    { question: 6, answer: "b" },
    { question: 7, answer: "b" },
    { question: 8, answer: "b" },
    { question: 9, answer: "a" },
    { question: 10, answer: "c" },
    { question: 11, answer: "c" },
    { question: 12, answer: "d" },
  ];

  this._pickAnswer = function ($answer, $answers) {
    $answers.find(".quiz-answer").removeClass("active");
    $answer.addClass("active");
  };
  this._calcResult = function () {
    var numberOfCorrectAnswers = 0;
    $("ul[data-quiz-question]").each(function (i) {
      var $this = $(this),
        chosenAnswer = $this.find(".quiz-answer.active").data("quiz-answer"),
        correctAnswer;

      for (var j = 0; j < self.correctAnswers.length; j++) {
        var a = self.correctAnswers[j];
        if (a.question == $this.data("quiz-question")) {
          correctAnswer = a.answer;
        }
      }
      if (chosenAnswer == correctAnswer) {
        numberOfCorrectAnswers++;

        // highlight this as correct answer
        $this.find(".quiz-answer.active").addClass("correct");
      } else {
        $this
          .find('.quiz-answer[data-quiz-answer="' + correctAnswer + '"]')
          .addClass("correct");
        $this.find(".quiz-answer.active").addClass("incorrect");
      }
    });
    var text = `${numberOfCorrectAnswers}/12`;
    if (numberOfCorrectAnswers < 6) {
      return { code: "bad", text: text };
    } else if (numberOfCorrectAnswers == 6 || numberOfCorrectAnswers == 7) {
      return { code: "mid", text: text };
    } else if (numberOfCorrectAnswers > 8) {
      return { code: "good", text: text };
    }
  };
  this._isComplete = function () {
    var answersComplete = 0;
    $("ul[data-quiz-question]").each(function () {
      if ($(this).find(".quiz-answer.active").length) {
        answersComplete++;
      }
    });
    if (answersComplete >= 12) {
      return true;
    } else {
      return false;
    }
  };
  this._showResult = function (result) {
    $(".quiz-result").addClass(result.code).html(result.text);
  };
  this._bindEvents = function () {
    $(".quiz-answer").on("click", function () {
      console.log("hello");
      var $this = $(this);
      var $answers = $this.closest("ul[data-quiz-question]");
      self._pickAnswer($this, $answers);
      if (self._isComplete()) {
        // scroll to answer section
        $("html, body").animate({
          scrollTop: $(".quiz-result").offset().top,
        });

        self._showResult(self._calcResult());
        $(".quiz-answer").off("click");
      }
    });
  };
};

$(document).ready(function () {
  //for change state on paging dots

  var quiz = new Quiz();
  quiz.init();
  // $(".quiz-result").addClass("good").html("2/12");
});
