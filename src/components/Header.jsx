function Header({ account, onLogout }) {
  const isIvan = account.id === "ivan";

  return (
    <header className={`atm-header ${isIvan ? "header-ivan" : "header-sam"}`}>
      <div className="header-brand">
        <span className="header-heart">♥</span>

        <div>
          <strong>LOVE ATM</strong>
          <small>COUPLE BANK</small>
        </div>
      </div>

      <button
        className="logout-button"
        onClick={onLogout}
        type="button"
      >
        EXIT
      </button>
    </header>
  );
}

export default Header;