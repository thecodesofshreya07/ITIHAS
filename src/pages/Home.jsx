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
            Civilizations rose, empires fell, and ideas reshaped the world.
            <br />
            Use the navigation above to dive into timelines, maps, stories, and
            quizzes.
          </p>
        </section>
      </main>
    </>
  );
}
