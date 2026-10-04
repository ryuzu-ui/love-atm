import { useState } from "react";

import Header from "./Header";
import LoveActionModal from "./LoveActionModal";

import "../styles/dashboard.css";

function Dashboard({
  account,
  onLogout,
}) {
  const isIvan = account.id === "ivan";

  const receiver = isIvan
    ? {
        id: "sam",
        name: "SAM",
      }
    : {
        id: "ivan",
        name: "IVAN",
      };

  const [activeAction, setActiveAction] =
    useState(null);

  const [transactions, setTransactions] =
    useState([]);

  const handleLoveAction = (action) => {
    setActiveAction(action);
  };

  const handleTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      sender: account.name,
      receiver: receiver.name,
      type: transaction.type,
      amount: transaction.amount,
      message: transaction.message,
      createdAt: new Date().toISOString(),
    };

    setTransactions((current) => [
      newTransaction,
      ...current,
    ]);

    setActiveAction(null);
  };

  const getTransactionIcon = (type) => {
    if (type === "kisses") return "💋";
    if (type === "hugs") return "🫂";
    if (type === "points") return "♡";
    if (type === "letter") return "💌";

    return "♡";
  };

  const getTransactionName = (type) => {
    if (type === "kisses") return "Kisses";
    if (type === "hugs") return "Hugs";
    if (type === "points") return "Love Points";
    if (type === "letter") return "Love Letter";

    return "Love";
  };

  return (
    <section
      className={`dashboard-screen ${
        isIvan
          ? "dashboard-ivan"
          : "dashboard-sam"
      }`}
    >
      <div className="dashboard-container">

        <Header
          account={account}
          onLogout={onLogout}
        />

        <div className="dashboard-content">

          <div className="welcome-dashboard">
            <div>
              <span className="small-label">
                WELCOME BACK
              </span>

              <h1>
                Hi, {account.name}! ♡
              </h1>

              <p>
                What would you like to send today?
              </p>
            </div>

            <div className="account-heart">
              ♥
            </div>
          </div>

          <div className="love-balance">

            <div className="balance-top">
              <span>LOVE BALANCE</span>
              <span>♡</span>
            </div>

            <div className="balance-number">
              1,000
            </div>

            <div className="balance-label">
              LOVE POINTS
            </div>

          </div>

          <div className="action-grid">

            <button
              className="love-action kisses"
              onClick={() =>
                handleLoveAction("kisses")
              }
              type="button"
            >
              <span className="action-icon">
                💋
              </span>

              <div>
                <strong>Send Kisses</strong>
                <small>Give some kisses</small>
              </div>

              <span className="action-arrow">
                →
              </span>
            </button>

            <button
              className="love-action hugs"
              onClick={() =>
                handleLoveAction("hugs")
              }
              type="button"
            >
              <span className="action-icon">
                🫂
              </span>

              <div>
                <strong>Send Hugs</strong>
                <small>Send a warm hug</small>
              </div>

              <span className="action-arrow">
                →
              </span>
            </button>

            <button
              className="love-action points"
              onClick={() =>
                handleLoveAction("points")
              }
              type="button"
            >
              <span className="action-icon">
                ♡
              </span>

              <div>
                <strong>Love Points</strong>
                <small>Send some love</small>
              </div>

              <span className="action-arrow">
                →
              </span>
            </button>

            <button
              className="love-action letter"
              onClick={() =>
                handleLoveAction("letter")
              }
              type="button"
            >
              <span className="action-icon">
                💌
              </span>

              <div>
                <strong>Love Letter</strong>
                <small>Write something sweet</small>
              </div>

              <span className="action-arrow">
                →
              </span>
            </button>

          </div>

          <div className="dashboard-section">

            <div className="section-heading">
              <div>
                <span className="small-label">
                  RECENT ACTIVITY
                </span>

                <h2>
                  Love Transactions
                </h2>
              </div>
            </div>

            {transactions.length === 0 ? (
              <div className="empty-transactions">

                <div className="empty-icon">
                  ♡
                </div>

                <strong>
                  No love transactions yet
                </strong>

                <p>
                  Your cute moments will appear here.
                </p>

              </div>
            ) : (
              <div className="transaction-list">

                {transactions.map(
                  (transaction) => (
                    <div
                      className="transaction-card"
                      key={transaction.id}
                    >
                      <div className="transaction-icon">
                        {getTransactionIcon(
                          transaction.type
                        )}
                      </div>

                      <div className="transaction-info">
                        <strong>
                          {getTransactionName(
                            transaction.type
                          )}
                        </strong>

                        <span>
                          To {transaction.receiver}
                        </span>

                        {transaction.message && (
                          <p>
                            "{transaction.message}"
                          </p>
                        )}
                      </div>

                      {transaction.amount > 0 && (
                        <strong className="transaction-amount">
                          +{transaction.amount}
                        </strong>
                      )}
                    </div>
                  )
                )}

              </div>
            )}

          </div>

          <div className="dashboard-section">

            <div className="section-heading">
              <div>
                <span className="small-label">
                  SPECIAL
                </span>

                <h2>
                  Love Emergency
                </h2>
              </div>
            </div>

            <button
              className="emergency-card"
              type="button"
              onClick={() =>
                handleLoveAction("letter")
              }
            >
              <span className="emergency-icon">
                ♥
              </span>

              <div>
                <strong>
                  I NEED LOVE
                </strong>

                <p>
                  Send an instant love emergency.
                </p>
              </div>

              <span className="action-arrow">
                →
              </span>
            </button>

          </div>

        </div>

      </div>

      {activeAction && (
        <LoveActionModal
          action={activeAction}
          receiver={receiver}
          onClose={() => setActiveAction(null)}
          onSubmit={handleTransaction}
        />
      )}

    </section>
  );
}

export default Dashboard;