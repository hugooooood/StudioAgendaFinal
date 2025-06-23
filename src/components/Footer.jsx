import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} StudioAgenda. Todos los derechos reservados.</p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "3rem",
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
    color: "#555",
    fontSize: "0.9rem",
  },
};

export default Footer;
