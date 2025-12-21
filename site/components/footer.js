export default function Footer() {
  return (
    <footer className="sw-footer">
      <div className="sw-footer-inner">
        <span>© {new Date().getFullYear()} SquirrelWorks LLC</span>
        <span className="sw-footer-muted">Kasm Registry Storefront</span>
      </div>
    </footer>
  );
}
