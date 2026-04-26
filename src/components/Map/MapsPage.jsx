import Navbar from "../Navbar/Navbar";
import Map from "./Map";
import "../../pages/Home.css";

export default function MapsPage() {
  return (
    <>
      <Navbar />
      <main className="home">
        <section className="content-section">
          <h2>Maps</h2>
          <p>Explore where great civilizations rose and flourished.</p>
          <div style={{ marginTop: "40px" }}>
            <Map />
          </div>
        </section>
      </main>
    </>
  );
}
