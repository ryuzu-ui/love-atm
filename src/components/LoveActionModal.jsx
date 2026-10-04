import { useState } from "react";
import "../styles/modal.css";

const actionConfig = {
  kisses: {
    title: "Send Kisses",
    icon: "💋",
    description: "Send some kisses to your favorite person.",
    color: "blue",
    amounts: [1, 5, 10, 20],
    unit: "KISSES",
  },

  hugs: {
    title: "Send Hugs",
    icon: "🫂",
    description: "Wrap them in a warm virtual hug.",
    color: "yellow",
    amounts: [1, 5, 10, 20],
    unit: "HUGS",
  },

  points: {
    title: "Send Love Points",
    icon: "♡",
    description: "Send some love points their way.",
    color: "blue",
    amounts: [10, 25, 50, 100],
    unit: "POINTS",
  },

  letter: {
    title: "Love Letter",
    icon: "💌",
    description: "Write something sweet.",
    color: "yellow",
    amounts: [],
    unit: "",
  },
};

function LoveActionModal({
  action,
  receiver,
  onClose,
  onSubmit,
}) {
  const config = actionConfig[action];

  const [amount, setAmount] = useState(
    config.amounts[0] || 0
  );

  const [message, setMessage] = useState("");

  if (!config) {
    return null;
  }

  const handleSubmit = () => {
    if (action === "letter" && !message.trim()) {
      return;
    }

    onSubmit({
      type: action,
      amount,
      message: message.trim(),
    });
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className={`love-modal modal-${config.color}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <div className="modal-icon">
          {config.icon}
        </div>

        <h2>{config.title}</h2>

        <p className="modal-description">
          {config.description}
        </p>

        <div className="receiver-box">
          <span>SENDING TO</span>
          <strong>{receiver.name}</strong>
        </div>

        {config.amounts.length > 0 && (
          <>
            <label className="modal-label">
              SELECT AMOUNT
            </label>

            <div className="amount-grid">
              {config.amounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={
                    amount === value
                      ? "amount-button selected"
                      : "amount-button"
                  }
                  onClick={() => setAmount(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </>
        )}

        <label className="modal-label">
          MESSAGE
        </label>

        <textarea
          className="love-message-input"
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder={
            action === "letter"
              ? "Write your love letter..."
              : "Add a sweet message..."
          }
          maxLength={250}
        />

        <div className="character-count">
          {message.length}/250
        </div>

        <button
          className="send-love-button"
          type="button"
          onClick={handleSubmit}
          disabled={
            action === "letter" &&
            !message.trim()
          }
        >
          SEND LOVE ♡
        </button>
      </div>
    </div>
  );
}

export default LoveActionModal;