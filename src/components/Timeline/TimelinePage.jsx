import Navbar from "../Navbar/Navbar";
import Timeline from "./Timeline";
import "../../pages/Home.css";

export default function TimelinePage() {
  return (
    <>
      <Navbar />
      <main className="home">
        <section className="content-section">
          <h2>Timeline</h2>
          <p>Trace the unfolding of history across centuries.</p>
          <div style={{ marginTop: "40px" }}>
            <Timeline />
          </div>
        </section>
      </main>
    </>
  );
}
