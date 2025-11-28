function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Mailand VGS – IM fagportal</p>
    </footer>
  );
}

export default Footer;
