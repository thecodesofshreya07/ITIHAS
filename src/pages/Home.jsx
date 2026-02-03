import Navbar from "../components/Navbar/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home">
        <section className="hero">
          <h1>Where Time Writes Its Own Story</h1>
          <p>
            Civilizations rose, empires fell, and ideas reshaped the world.<br />
            Step into the echoes of time and uncover the stories that shaped humanity.
          </p>
        </section>

        <section className="content-section" id="timeline">
          <h2>Timeline</h2>
          <p>Trace the unfolding of history across centuries,where each moment leaves its mark upon time itself.</p>
        </section>

        <section className="content-section" id="maps">
          <h2>Maps</h2>
          <p>Witness the shifting borders of empires and civilizations,mapped across lands shaped by power, trade, and belief.</p>
        </section>

        <section className="content-section" id="stories">
          <h2>Stories</h2>
          <p>Discover tales of courage, sacrifice, and ambition,passed down through generations and carved into memory.</p>
        </section>

        <section className="content-section" id="quiz">
          <h2>Quiz</h2>
          <p>Challenge your understanding of the past,and test how well you know the stories that shaped our world.</p>
        </section>
      </main>
    </>
  );
}
