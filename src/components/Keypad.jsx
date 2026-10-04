import "../styles/pin.css";

function Keypad({ pin, onNumber, onDelete, onSubmit }) {
  const numbers = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "delete", "0", "enter",
  ];

  return (
    <div className="keypad">
      {numbers.map((number) => {
        if (number === "delete") {
          return (
            <button
              key={number}
              className="key key-action"
              onClick={onDelete}
              type="button"
            >
              ←
            </button>
          );
        }

        if (number === "enter") {
          return (
            <button
              key={number}
              className="key key-enter"
              onClick={onSubmit}
              type="button"
            >
              ✓
            </button>
          );
        }

        return (
          <button
            key={number}
            className="key"
            onClick={() => onNumber(number)}
            type="button"
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}

export default Keypad;