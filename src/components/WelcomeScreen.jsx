import "../styles/welcome.css";

function WelcomeScreen({ onStart }) {
  return (
    <section className="welcome-screen">
      <div className="welcome-card">

        <div className="atm-label">
          LOVE ATM
        </div>

        <div className="heart-logo">
          ♥
        </div>

        <h1>
          IVAN <span>×</span> SAM
        </h1>

        <p className="welcome-subtitle">
          Your personal ATM for love.
        </p>

        <div className="welcome-message">
          <p>No money required.</p>

          <p>
            Just love, kisses, hugs, and memories. ♡
          </p>
        </div>

        <button
          className="start-button"
          onClick={onStart}
        >
          START
        </button>

        <p className="welcome-footer">
          INSERT LOVE TO CONTINUE
        </p>

      </div>
    </section>
  );
}

export default WelcomeScreen;