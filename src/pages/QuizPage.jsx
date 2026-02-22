import Navbar from "../components/Navbar/Navbar";
import HistoryQuiz from "../components/Quiz/HistoryQuiz";
import "./Home.css";

export default function QuizPage() {
  return (
    <>
      <Navbar />
      <main className="home">
        <section className="content-section">
          <h2>Quiz</h2>
          <p>Challenge your understanding of the past.</p>
          <div style={{ marginTop: "40px" }}>
            <HistoryQuiz />
          </div>
        </section>
      </main>
    </>
  );
}

