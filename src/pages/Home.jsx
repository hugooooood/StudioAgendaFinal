import { Carousel, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import studio1 from "../assets/estudio1.jpg";
import studio2 from "../assets/estudio2.jpg";
import studio3 from "../assets/estudio3.jpg";

const Home = () => {
  return (
    <>
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Carousel
          controls={false}
          indicators={false}
          fade
          interval={5000}
          pause={false}
          style={{ height: "100vh" }}
        >
          {[studio1, studio2, studio3].map((img, i) => (
            <Carousel.Item key={i}>
              <img
                src={img}
                alt={`Slide ${i + 1}`}
                style={{
                  height: "100vh",
                  width: "100vw",
                  objectFit: "cover",
                  filter: "brightness(60%)",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            color: "white",
            zIndex: 2,
            padding: "2rem",
          }}
        >
          <h1 className="fw-bold display-4 mb-4" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}>
            Bienvenido a StudioAgenda
          </h1>
          <p className="lead mb-4" style={{ maxWidth: "700px", textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>
            Una plataforma que conecta artistas emergentes con estudios de grabación accesibles en Chile. Agenda tu sesión en minutos y haz sonar tu talento.
          </p>
          <Button variant="light" size="lg" href="/register" className="fw-semibold px-4 py-2 shadow">
            Comienza a agendar ya
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
