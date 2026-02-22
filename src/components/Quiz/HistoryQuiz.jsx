import React, { useState, useEffect } from "react";
import "./HistoryQuiz.css";

const HistoryQuiz = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const quizDatabase = {
    "ancient egypt": {
      title: "Ancient Egypt",
      questions: [
        {
          question: "Which pharaoh built the Great Pyramid of Giza?",
          options: ["Tutankhamun", "Khufu", "Ramses II", "Cleopatra"],
          correct: 1,
        },
        {
          question: "Which river was central to Egyptian civilization?",
          options: ["Tigris", "Nile", "Indus", "Euphrates"],
          correct: 1,
        },
        {
          question: "What writing system did the ancient Egyptians use?",
          options: ["Cuneiform", "Hieroglyphics", "Sanskrit", "Latin"],
          correct: 1,
        },
        {
          question:
            "What was the primary purpose of the pyramids on the Giza plateau?",
          options: [
            "Military fortresses",
            "Royal tombs",
            "Marketplaces",
            "Administrative centers",
          ],
          correct: 1,
        },
        {
          question: "Which stone helped modern scholars decode Egyptian writing?",
          options: [
            "Rosetta Stone",
            "Emerald Tablet",
            "Behistun Inscription",
            "Code of Hammurabi",
          ],
          correct: 0,
        },
        {
          question: "Who was the famous female pharaoh who ruled as king?",
          options: ["Nefertiti", "Cleopatra VII", "Hatshepsut", "Merneith"],
          correct: 2,
        },
        {
          question:
            "Which god was associated with the afterlife and mummification?",
          options: ["Ra", "Osiris", "Anubis", "Horus"],
          correct: 2,
        },
        {
          question: "What was placed in canopic jars during mummification?",
          options: ["Weapons", "Organs", "Gold jewelry", "Scrolls"],
          correct: 1,
        },
        {
          question:
            "Which city served as the capital during much of the Old Kingdom?",
          options: ["Thebes", "Alexandria", "Memphis", "Luxor"],
          correct: 2,
        },
        {
          question:
            "What natural feature protected Egypt from many foreign invasions?",
          options: [
            "Thick forests",
            "High mountain ranges",
            "Surrounding deserts",
            "Arctic ice",
          ],
          correct: 2,
        },
      ],
    },
    "indus valley": {
      title: "Indus Valley Civilization",
      questions: [
        {
          question:
            "Which of these was a major city of the Indus Valley Civilization?",
          options: ["Athens", "Harappa", "Rome", "Carthage"],
          correct: 1,
        },
        {
          question:
            "What modern countries contain most of the Indus Valley sites?",
          options: [
            "India and Pakistan",
            "China and Nepal",
            "Iraq and Syria",
            "Egypt and Sudan",
          ],
          correct: 0,
        },
        {
          question:
            "What feature of Indus cities is especially famous for its sophistication?",
          options: [
            "Underground tombs",
            "Hanging gardens",
            "Drainage and sewage systems",
            "Stone pyramids",
          ],
          correct: 2,
        },
        {
          question:
            "What is unusual about the Indus script compared to many others?",
          options: [
            "It was only spoken",
            "It has not yet been fully deciphered",
            "It uses only numbers",
            "It was written on metal only",
          ],
          correct: 1,
        },
        {
          question:
            "Which material were many Indus seals and beads commonly made from?",
          options: ["Obsidian", "Ivory", "Lapis lazuli", "Steatite"],
          correct: 3,
        },
        {
          question:
            "Which river was central to the heartland of the Indus civilization?",
          options: ["Yellow River", "Nile", "Indus", "Danube"],
          correct: 2,
        },
        {
          question:
            "What does the uniformity of bricks and weights in Indus cities suggest?",
          options: [
            "Lack of planning",
            "Strong central administration",
            "Independent villages",
            "Nomadic lifestyle",
          ],
          correct: 1,
        },
        {
          question:
            "Which of the following best describes Indus Valley houses?",
          options: [
            "Built of wood with thatched roofs",
            "Mostly tents and huts",
            "Standardized brick houses with courtyards",
            "Cave dwellings in cliffs",
          ],
          correct: 2,
        },
        {
          question:
            "Around what time period did the Mature Harappan phase flourish?",
          options: [
            "500–100 BCE",
            "2600–1900 BCE",
            "800–200 BCE",
            "1200–800 CE",
          ],
          correct: 1,
        },
        {
          question:
            "Which of these is a challenge in understanding Indus religion?",
          options: [
            "No temples have survived",
            "No images were ever made",
            "The script is undeciphered and texts are unknown",
            "They left no artifacts at all",
          ],
          correct: 2,
        },
      ],
    },
    mesopotamia: {
      title: "Mesopotamia",
      questions: [
        {
          question: "What does the word “Mesopotamia” literally mean?",
          options: [
            "Land of the rising sun",
            "Land between the rivers",
            "Land of many mountains",
            "Land of sacred temples",
          ],
          correct: 1,
        },
        {
          question:
            "Which two rivers framed the core region of Mesopotamian civilization?",
          options: [
            "Nile and Niger",
            "Tigris and Euphrates",
            "Indus and Ganges",
            "Yangtze and Yellow",
          ],
          correct: 1,
        },
        {
          question:
            "Which people are often credited with developing one of the earliest writing systems, cuneiform?",
          options: ["Egyptians", "Sumerians", "Phoenicians", "Greeks"],
          correct: 1,
        },
        {
          question: "What type of stepped temple tower was common in Mesopotamia?",
          options: ["Pyramid", "Stupa", "Ziggurat", "Pagoda"],
          correct: 2,
        },
        {
          question:
            "The famous law code carved on a stone stele is associated with which king?",
          options: ["Hammurabi", "Ashoka", "Ramses II", "Nebuchadnezzar II"],
          correct: 0,
        },
        {
          question: "Which epic poem from Mesopotamia tells of a great flood?",
          options: [
            "Iliad",
            "Epic of Gilgamesh",
            "Aeneid",
            "Mahabharata",
          ],
          correct: 1,
        },
        {
          question:
            "Which Mesopotamian city is famous for its legendary “Hanging Gardens”?",
          options: ["Nineveh", "Uruk", "Babylon", "Ur"],
          correct: 2,
        },
        {
          question: "Which metalworking skill was advanced in Mesopotamia?",
          options: ["Iron casting only", "Bronze working", "Aluminum forging", "Steelmaking"],
          correct: 1,
        },
        {
          question:
            "Which group eventually conquered Babylon in 539 BCE, ending Neo-Babylonian rule?",
          options: ["Romans", "Persians", "Greeks", "Hittites"],
          correct: 1,
        },
        {
          question:
            "Which of the following was a typical crop in Mesopotamian agriculture?",
          options: ["Rice", "Maize", "Barley", "Potatoes"],
          correct: 2,
        },
      ],
    },
    "mughal empire": {
      title: "Mughal Empire",
      questions: [
        {
          question:
            "Who founded the Mughal Empire in India after the Battle of Panipat (1526)?",
          options: ["Akbar", "Babur", "Aurangzeb", "Shah Jahan"],
          correct: 1,
        },
        {
          question:
            "Which Mughal emperor is often called “Akbar the Great” for his policies of tolerance and expansion?",
          options: ["Babur", "Akbar", "Jahangir", "Humayun"],
          correct: 1,
        },
        {
          question:
            "Which world-famous monument was built by Shah Jahan in memory of his wife Mumtaz Mahal?",
          options: [
            "Red Fort",
            "Qutub Minar",
            "Taj Mahal",
            "Charminar",
          ],
          correct: 2,
        },
        {
          question:
            "Which language flourished at the Mughal court as a blend of Persian and local dialects?",
          options: ["Latin", "Urdu", "Greek", "Arabic"],
          correct: 1,
        },
        {
          question:
            "What was a major feature of Akbar’s rule that tried to include both Hindus and Muslims in governance?",
          options: [
            "Complete isolation",
            "Religious persecution",
            "Sulh-i-kul (policy of universal peace)",
            "Ban on trade",
          ],
          correct: 2,
        },
        {
          question:
            "Which Mughal ruler extended the empire to its greatest territorial extent but faced many revolts?",
          options: ["Akbar", "Aurangzeb", "Shah Jahan", "Jahangir"],
          correct: 1,
        },
        {
          question:
            "Which art form is especially associated with the Mughal courts?",
          options: [
            "Cave painting",
            "Miniature painting",
            "Graffiti art",
            "Oil on canvas only",
          ],
          correct: 1,
        },
        {
          question:
            "Which European trading company grew in power as the Mughal Empire weakened?",
          options: [
            "East India Company",
            "Dutch East India Company",
            "Virginia Company",
            "Hudson’s Bay Company",
          ],
          correct: 0,
        },
        {
          question:
            "Which city became a major Mughal capital and site of the Red Fort?",
          options: ["Delhi", "Agra", "Lahore", "Kabul"],
          correct: 0,
        },
        {
          question:
            "In which century did the Mughal Empire effectively collapse, paving the way for British rule?",
          options: [
            "15th century",
            "17th century",
            "18th–19th centuries",
            "21st century",
          ],
          correct: 2,
        },
      ],
    },
    "world war 2": {
      title: "World War II",
      questions: [
        {
          question: "In what year did WWII begin in Europe?",
          options: ["1937", "1939", "1941", "1945"],
          correct: 1,
        },
        {
          question:
            "Which event is commonly seen as the immediate trigger for WWII?",
          options: [
            "German invasion of Poland",
            "Bombing of Pearl Harbor",
            "Annexation of Austria",
            "Battle of Britain",
          ],
          correct: 0,
        },
        {
          question: "Which countries formed the main Axis Powers?",
          options: [
            "Germany, Italy, Japan",
            "France, Britain, USA",
            "China, USSR, USA",
            "Spain, Portugal, Sweden",
          ],
          correct: 0,
        },
        {
          question: "What was D-Day (June 6, 1944)?",
          options: [
            "Japanese attack on Pearl Harbor",
            "German surrender",
            "Allied invasion of Normandy",
            "Atomic bombing of Hiroshima",
          ],
          correct: 2,
        },
        {
          question:
            "Which leader was the Prime Minister of Britain for most of WWII?",
          options: [
            "Neville Chamberlain",
            "Winston Churchill",
            "Clement Attlee",
            "Franklin D. Roosevelt",
          ],
          correct: 1,
        },
        {
          question:
            "Which ideology was central to Nazi Germany under Hitler?",
          options: ["Communism", "Fascism and racial nationalism", "Liberalism", "Pacifism"],
          correct: 1,
        },
        {
          question:
            "Which two cities were destroyed by atomic bombs in August 1945?",
          options: [
            "Tokyo and Osaka",
            "Berlin and Hamburg",
            "Hiroshima and Nagasaki",
            "Rome and Milan",
          ],
          correct: 2,
        },
        {
          question:
            "What was the Holocaust?",
          options: [
            "A secret weapons project",
            "Systematic genocide of Jews and other groups by the Nazis",
            "A battle in North Africa",
            "An Allied code name for D-Day",
          ],
          correct: 1,
        },
        {
          question:
            "Which international organization was created after WWII to promote peace?",
          options: [
            "League of Nations",
            "United Nations (UN)",
            "NATO",
            "European Union",
          ],
          correct: 1,
        },
        {
          question:
            "Which front saw brutal fighting between Germany and the Soviet Union?",
          options: [
            "Western Front",
            "Pacific Front",
            "Eastern Front",
            "North African Front",
          ],
          correct: 2,
        },
      ],
    },
  };

  useEffect(() => {
    let interval;
    if (quizStarted && !showResult) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, showResult]);

  const findQuiz = (query) => {
    const key = Object.keys(quizDatabase).find((k) =>
      query.toLowerCase().includes(k)
    );
    return key ? quizDatabase[key] : null;
  };

  const handleStartQuiz = () => {
    if (!searchQuery.trim()) return;
    const quiz = findQuiz(searchQuery);
    if (!quiz) {
      alert("Quiz not found. Try 'Ancient Egypt' or 'World War 2'");
      return;
    }
    setQuizData(quiz);
    setQuizStarted(true);
    setScore(0);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setShowResult(false);
  };

  const handleAnswerSelect = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === quizData.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setQuizData(null);
    setSearchQuery("");
    setScore(0);
    setTimeElapsed(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {!quizStarted ? (
          <>
            <h1>History Quiz</h1>
            <input
              type="text"
              placeholder="Try: Ancient Egypt, Indus Valley, Mesopotamia, Mughal Empire, World War 2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="quiz-input"
            />
            <button onClick={handleStartQuiz} className="quiz-button">
              Start Quiz
            </button>
          </>
        ) : showResult ? (
          <>
            <h2>Quiz Completed!</h2>
            <div className="quiz-result-score">
              {score} / {quizData.questions.length}
            </div>
            <p className="quiz-timer">Time: {formatTime(timeElapsed)}</p>
            <button onClick={handleRestart} className="quiz-button">
              Restart
            </button>
          </>
        ) : (
          <>
            <h2>{quizData.title}</h2>
            <p>
              Question {currentQuestion + 1} of{" "}
              {quizData.questions.length}
            </p>

            <h3>
              {quizData.questions[currentQuestion].question}
            </h3>

            {quizData.questions[currentQuestion].options.map(
              (option, index) => {
                let className = "quiz-option";

                if (isAnswered) {
                  if (
                    index ===
                    quizData.questions[currentQuestion].correct
                  ) {
                    className += " correct";
                  } else if (index === selectedAnswer) {
                    className += " wrong";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={className}
                  >
                    {option}
                  </button>
                );
              }
            )}

            {isAnswered && (
              <button onClick={handleNext} className="quiz-button">
                {currentQuestion <
                quizData.questions.length - 1
                  ? "Next"
                  : "Finish"}
              </button>
            )}

            <p className="quiz-timer">
              Time: {formatTime(timeElapsed)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryQuiz;
