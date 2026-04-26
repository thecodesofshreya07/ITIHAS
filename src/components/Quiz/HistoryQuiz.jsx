import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./HistoryQuiz.css";

const HistoryQuiz = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const quizDatabase = {
    "ancient egypt": {
      title: "Ancient Egypt",
      questions: [
        {
          question: "Which pharaoh built the Great Pyramid of Giza?",
          options: ["Tutankhamun", "Khufu", "Ramses II", "Cleopatra"],
          correct: 1,
          explanation: "Khufu, a ruler of Egypt’s Old Kingdom, commissioned the Great Pyramid of Giza, one of the Seven Wonders of the Ancient World."
        },
        {
          question: "Which river was central to Egyptian civilization?",
          options: ["Tigris", "Nile", "Indus", "Euphrates"],
          correct: 1,
          explanation: "The Nile River provided water, fertile soil through annual floods, and a transportation route, making civilization possible in Egypt."
        },
        {
          question: "What writing system did the ancient Egyptians use?",
          options: ["Cuneiform", "Hieroglyphics", "Sanskrit", "Latin"],
          correct: 1,
          explanation: "Hieroglyphics was a symbolic writing system used in temples, tombs, and monuments to record religious texts and history."
        },
        {
          question: "What was the primary purpose of the pyramids on the Giza plateau?",
          options: ["Military fortresses", "Royal tombs", "Marketplaces", "Administrative centers"],
          correct: 1,
          explanation: "Pyramids were built as royal tombs to protect the pharaoh’s body and belongings for the afterlife."
        },
        {
          question: "Which stone helped modern scholars decode Egyptian writing?",
          options: ["Rosetta Stone", "Emerald Tablet", "Behistun Inscription", "Code of Hammurabi"],
          correct: 0,
          explanation: "The Rosetta Stone contained the same text in Greek, Demotic, and Hieroglyphics, allowing scholars to finally decode Egyptian writing."
        },
        {
          question: "Who was the famous female pharaoh who ruled as king?",
          options: ["Nefertiti", "Cleopatra VII", "Hatshepsut", "Merneith"],
          correct: 2,
          explanation: "Hatshepsut was one of the few female pharaohs who ruled Egypt successfully and adopted full royal titles."
        },
        {
          question: "Which god was associated with the afterlife and mummification?",
          options: ["Ra", "Osiris", "Anubis", "Horus"],
          correct: 2,
          explanation: "Anubis, depicted with a jackal head, was the god of mummification and protector of the dead."
        },
        {
          question: "What was placed in canopic jars during mummification?",
          options: ["Weapons", "Organs", "Gold jewelry", "Scrolls"],
          correct: 1,
          explanation: "Internal organs like the liver and lungs were preserved in canopic jars to accompany the body into the afterlife."
        },
        {
          question: "Which city served as the capital during much of the Old Kingdom?",
          options: ["Thebes", "Alexandria", "Memphis", "Luxor"],
          correct: 2,
          explanation: "Memphis was the capital during the Old Kingdom and a major political and cultural center of Egypt."
        },
        {
          question: "What natural feature protected Egypt from many foreign invasions?",
          options: ["Thick forests", "High mountain ranges", "Surrounding deserts", "Arctic ice"],
          correct: 2,
          explanation: "The vast deserts surrounding Egypt acted as natural barriers, protecting it from many external invasions."
        }
      ]
    },
    "indus valley": {
      title: "Indus Valley Civilization",
      questions: [
        {
          question: "Which of these was a major city of the Indus Valley Civilization?",
          options: ["Athens", "Harappa", "Rome", "Carthage"],
          correct: 1,
          explanation: "Harappa was one of the major urban centers of the Indus Valley Civilization, known for its advanced city planning."
        },
        {
          question: "What modern countries contain most of the Indus Valley sites?",
          options: ["India and Pakistan", "China and Nepal", "Iraq and Syria", "Egypt and Sudan"],
          correct: 0,
          explanation: "Most Indus Valley sites are located in present-day Pakistan and northwest India."
        },
        {
          question: "What feature of Indus cities is especially famous for its sophistication?",
          options: ["Underground tombs", "Hanging gardens", "Drainage and sewage systems", "Stone pyramids"],
          correct: 2,
          explanation: "Indus cities had advanced drainage systems, showing high levels of urban planning and engineering."
        },
        {
          question: "What is unusual about the Indus script compared to many others?",
          options: ["It was only spoken", "It has not yet been fully deciphered", "It uses only numbers", "It was written on metal only"],
          correct: 1,
          explanation: "The Indus script remains undeciphered, making it difficult to fully understand their language and culture."
        },
        {
          question: "Which material were many Indus seals and beads commonly made from?",
          options: ["Obsidian", "Ivory", "Lapis lazuli", "Steatite"],
          correct: 3,
          explanation: "Steatite was widely used to create seals, which often featured animals and symbols."
        },
        {
          question: "Which river was central to the heartland of the Indus civilization?",
          options: ["Yellow River", "Nile", "Indus", "Danube"],
          correct: 2,
          explanation: "The Indus River provided water and fertile land for agriculture, supporting large populations."
        },
        {
          question: "What does the uniformity of bricks and weights in Indus cities suggest?",
          options: ["Lack of planning", "Strong central administration", "Independent villages", "Nomadic lifestyle"],
          correct: 1,
          explanation: "Standardization indicates a well-organized administrative system controlling construction and trade."
        },
        {
          question: "Which of the following best describes Indus Valley houses?",
          options: ["Wood huts", "Tents", "Brick houses with courtyards", "Caves"],
          correct: 2,
          explanation: "Most houses were made of baked bricks and had courtyards, indicating structured urban living."
        },
        {
          question: "Around what time did the Mature Harappan phase flourish?",
          options: ["500 BCE", "2600–1900 BCE", "800 BCE", "1200 CE"],
          correct: 1,
          explanation: "The civilization reached its peak between 2600 and 1900 BCE."
        },
        {
          question: "Why is Indus religion difficult to understand?",
          options: ["No temples", "No images", "Script undeciphered", "No artifacts"],
          correct: 2,
          explanation: "Because the script is undeciphered, historians cannot fully interpret religious texts."
        }
      ]
    },
    mesopotamia: {
      title: "Mesopotamia",
      questions: [
        {
          question: "What does 'Mesopotamia' mean?",
          options: ["Land of sun", "Land between rivers", "Mountain land", "Temple land"],
          correct: 1,
          explanation: "Mesopotamia means 'land between rivers', referring to the Tigris and Euphrates."
        },
        {
          question: "Which rivers were central?",
          options: ["Nile & Niger", "Tigris & Euphrates", "Indus & Ganges", "Yangtze & Yellow"],
          correct: 1,
          explanation: "The Tigris and Euphrates rivers supported agriculture and settlements."
        },
        {
          question: "Who developed cuneiform?",
          options: ["Egyptians", "Sumerians", "Greeks", "Romans"],
          correct: 1,
          explanation: "The Sumerians created cuneiform, one of the earliest writing systems."
        },
        {
          question: "What is a ziggurat?",
          options: ["Temple tower", "Palace", "Bridge", "Wall"],
          correct: 0,
          explanation: "Ziggurats were massive temple structures used for religious purposes."
        },
        {
          question: "Who created a famous law code?",
          options: ["Hammurabi", "Ashoka", "Ramses", "Caesar"],
          correct: 0,
          explanation: "Hammurabi’s Code was one of the earliest written legal systems."
        },
        {
          question: "Which epic mentions a flood?",
          options: ["Iliad", "Gilgamesh", "Mahabharata", "Ramayana"],
          correct: 1,
          explanation: "The Epic of Gilgamesh includes one of the earliest flood stories."
        },
        {
          question: "Which city had Hanging Gardens?",
          options: ["Ur", "Babylon", "Nineveh", "Uruk"],
          correct: 1,
          explanation: "Babylon is associated with the legendary Hanging Gardens."
        },
        {
          question: "Which metal skill was advanced?",
          options: ["Iron", "Bronze", "Aluminum", "Steel"],
          correct: 1,
          explanation: "Bronze tools and weapons were widely used."
        },
        {
          question: "Who conquered Babylon in 539 BCE?",
          options: ["Romans", "Persians", "Greeks", "Hittites"],
          correct: 1,
          explanation: "The Persian Empire under Cyrus the Great conquered Babylon."
        },
        {
          question: "Main crop?",
          options: ["Rice", "Maize", "Barley", "Potato"],
          correct: 2,
          explanation: "Barley was a staple crop due to suitable climate conditions."
        }
      ]
    },
    "mughal empire": {
      title: "Mughal Empire",
      questions: [
        {
          question: "Who founded the Mughal Empire?",
          options: ["Akbar", "Babur", "Aurangzeb", "Shah Jahan"],
          correct: 1,
          explanation: "Babur founded the Mughal Empire after defeating Ibrahim Lodi in 1526."
        },
        {
          question: "Who was Akbar?",
          options: ["Founder", "Great emperor", "Poet", "General"],
          correct: 1,
          explanation: "Akbar expanded the empire and promoted religious tolerance."
        },
        {
          question: "Who built the Taj Mahal?",
          options: ["Akbar", "Babur", "Shah Jahan", "Aurangzeb"],
          correct: 2,
          explanation: "Shah Jahan built it in memory of Mumtaz Mahal."
        },
        {
          question: "Which language flourished?",
          options: ["Latin", "Urdu", "Greek", "Chinese"],
          correct: 1,
          explanation: "Urdu developed from Persian and local languages."
        },
        {
          question: "What is Sulh-i-kul?",
          options: ["War policy", "Peace policy", "Trade rule", "Tax law"],
          correct: 1,
          explanation: "Akbar promoted universal peace and religious harmony."
        },
        {
          question: "Who expanded empire most?",
          options: ["Akbar", "Aurangzeb", "Jahangir", "Babur"],
          correct: 1,
          explanation: "Aurangzeb expanded territory but faced revolts."
        },
        {
          question: "Famous art?",
          options: ["Cave", "Miniature painting", "Modern art", "Graffiti"],
          correct: 1,
          explanation: "Mughal miniature paintings were highly detailed."
        },
        {
          question: "Which company rose?",
          options: ["East India Company", "Dutch Co.", "French Co.", "None"],
          correct: 0,
          explanation: "British East India Company gained power as Mughals weakened."
        },
        {
          question: "Capital city?",
          options: ["Delhi", "Agra", "Lahore", "Kabul"],
          correct: 0,
          explanation: "Delhi became an important Mughal capital."
        },
        {
          question: "Decline period?",
          options: ["15th", "17th", "18–19th", "21st"],
          correct: 2,
          explanation: "The empire declined during the 18th–19th centuries."
        }
      ]
    },
    "world war 2": {
      title: "World War II",
      questions: [
        {
          question: "When did WWII begin?",
          options: ["1937", "1939", "1941", "1945"],
          correct: 1,
          explanation: "WWII began in 1939 with Germany invading Poland."
        },
        {
          question: "Trigger event?",
          options: ["Poland invasion", "Pearl Harbor", "Austria annexation", "Battle of Britain"],
          correct: 0,
          explanation: "Germany’s invasion of Poland triggered the war."
        },
        {
          question: "Axis Powers?",
          options: ["Germany, Italy, Japan", "USA, UK, France", "China, USSR", "None"],
          correct: 0,
          explanation: "Axis powers formed the main opposing alliance."
        },
        {
          question: "D-Day?",
          options: ["Pearl Harbor", "Germany fall", "Normandy invasion", "Atomic bomb"],
          correct: 2,
          explanation: "D-Day marked Allied invasion of Normandy in 1944."
        },
        {
          question: "UK leader?",
          options: ["Chamberlain", "Churchill", "Attlee", "Roosevelt"],
          correct: 1,
          explanation: "Winston Churchill led Britain during most of WWII."
        },
        {
          question: "Nazi ideology?",
          options: ["Communism", "Fascism", "Liberalism", "Pacifism"],
          correct: 1,
          explanation: "Nazism promoted extreme nationalism and racial ideology."
        },
        {
          question: "Atomic bombs cities?",
          options: ["Tokyo", "Berlin", "Hiroshima & Nagasaki", "Rome"],
          correct: 2,
          explanation: "USA dropped atomic bombs in 1945 to end the war."
        },
        {
          question: "Holocaust?",
          options: ["Battle", "Genocide", "Treaty", "Code"],
          correct: 1,
          explanation: "Holocaust was systematic genocide by Nazis."
        },
        {
          question: "Organization formed?",
          options: ["League", "UN", "NATO", "EU"],
          correct: 1,
          explanation: "UN was formed to maintain global peace."
        },
        {
          question: "Eastern Front?",
          options: ["USA vs Japan", "Germany vs USSR", "UK vs Italy", "France vs Spain"],
          correct: 1,
          explanation: "It was one of the deadliest fronts in the war."
        }
      ]
    }
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
    if (!selectedTopic) {
      alert("Please select a topic");
      return;
    }
    const quiz = quizDatabase[selectedTopic];
    setQuizData(quiz);
    setQuizStarted(true);
    setScore(0);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setShowResult(false);
    setUserAnswers([]);
  };

  const handleAnswerSelect = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    const currentQ = quizData.questions[currentQuestion];
    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ.question,
        selectedAnswer: currentQ.options[index],
        correctAnswer: currentQ.options[currentQ.correct],
      },
    ]);

    if (index === currentQ.correct) {
      setScore(score + 1);
    }
  };

  const { user, updateProgress } = useAuth();

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);

      if (user) {
        const formattedQuestions = quizData.questions.map((q, index) => ({
          question: q.question,
          selectedAnswer:
            userAnswers[index]?.selectedAnswer || "Not Answered",
          correctAnswer: q.options[q.correct],
          explanation: q.explanation || "Explanation not available"
        }));

        console.log("FINAL DATA:", formattedQuestions); // DEBUG

        updateProgress({
          title: quizData.title,
          score,
          total: quizData.questions.length,
          time: timeElapsed,
          questions: formattedQuestions,
          source: "main"
        });
      }
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setQuizData(null);
    setSearchQuery("");
    setSelectedTopic(null);
    setScore(0);
    setTimeElapsed(0);
    setUserAnswers([]);
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
            <p style={{ color: 'var(--text-muted, #aaa)', marginBottom: '24px', fontSize: '15px' }}>
              Select a topic below to begin
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '14px',
              marginBottom: '28px'
            }}>
              {Object.entries(quizDatabase).map(([key, quiz]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTopic(key)}
                  style={{
                    padding: '14px 10px',
                    borderRadius: '8px',
                    border: selectedTopic === key
                      ? '2px solid var(--gold, #c9a14a)'
                      : '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: selectedTopic === key
                      ? 'rgba(201,161,74,0.18)'
                      : 'rgba(255,255,255,0.04)',
                    color: selectedTopic === key ? 'var(--gold, #c9a14a)' : 'inherit',
                    fontWeight: selectedTopic === key ? '700' : '400',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.25s ease',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}
                >
                  {quiz.title}
                </button>
              ))}
            </div>
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
