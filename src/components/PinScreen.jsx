import { useState } from "react";

import Keypad from "./Keypad";
import "../styles/pin.css";

function PinScreen({
  account,
  onSuccess,
  onBack,
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const maxPinLength = 4;

  const handleNumber = (number) => {
    if (pin.length >= maxPinLength) {
      return;
    }

    setError("");
    setPin((current) => current + number);
  };

  const handleDelete = () => {
    setError("");
    setPin((current) => current.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length !== 4) {
      setError("Please enter your 4-digit PIN.");
      return;
    }

    if (pin === account.pin) {
      setError("");
      onSuccess();
      return;
    }

    setError("Incorrect PIN. Try again.");
    setPin("");
  };

  const handleBack = () => {
    setPin("");
    setError("");
    onBack();
  };

  const isIvan = account.id === "ivan";

  return (
    <section
      className={`pin-screen ${
        isIvan ? "pin-ivan" : "pin-sam"
      }`}
    >
      <div className="pin-card">

        <button
          className="pin-back"
          onClick={handleBack}
          type="button"
        >
          ← Back
        </button>

        <div className="pin-account-badge">
          <span className="pin-heart">♥</span>

          <div>
            <strong>{account.name}</strong>
            <small>LOVE ACCOUNT</small>
          </div>
        </div>

        <div className="pin-heading">
          <h1>Enter your PIN</h1>

          <p>
            Welcome back, {account.name.toLowerCase()} ♡
          </p>
        </div>

        <div className="pin-dots">
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              className={
                index < pin.length
                  ? "pin-dot filled"
                  : "pin-dot"
              }
            >
              {index < pin.length ? "♥" : ""}
            </span>
          ))}
        </div>

        {error && (
          <p className="pin-error">
            {error}
          </p>
        )}

        <Keypad
          pin={pin}
          onNumber={handleNumber}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />

        <p className="pin-hint">
          4-DIGIT LOVE PIN
        </p>

      </div>
    </section>
  );
}

export default PinScreen;