import { accountList } from "../data/accounts";
import "../styles/accounts.css";

function AccountSelection({ onSelectAccount, onBack }) {
  return (
    <section className="account-screen">

      <div className="account-card">

        <div className="account-header">
          <p className="atm-label">
            LOVE ATM
          </p>

          <h1>
            WHO ARE YOU?
          </h1>

          <p>
            Select your account to continue.
          </p>
        </div>

        <div className="account-list">

          {accountList.map((account) => (
            <button
              key={account.id}
              className={`account-button ${account.color}`}
              onClick={() => onSelectAccount(account)}
            >
              <div className="account-icon">
                ♥
              </div>

              <div className="account-info">
                <strong>
                  {account.name}
                </strong>

                <span>
                  {account.name === "IVAN"
                    ? "BLUE ACCOUNT"
                    : "YELLOW ACCOUNT"}
                </span>
              </div>

              <div className="account-arrow">
                →
              </div>
            </button>
          ))}

        </div>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← BACK
        </button>

      </div>

    </section>
  );
}

export default AccountSelection;