function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          <strong>FITFLEX</strong> – Gym Membership Management System
        </p>
        <p className="footer-muted">© {year} FitFlex. Built with React &amp; Vite.</p>
      </div>
    </footer>
  );
}

export default Footer;
