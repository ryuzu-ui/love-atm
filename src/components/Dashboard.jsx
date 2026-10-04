import { useEffect, useState } from "react";

import Header from "./Header";
import LoveActionModal from "./LoveActionModal";

import {
  createTransaction,
  getTransactions,
} from "../utils/transactions";

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

  const [loadingHistory, setLoadingHistory] =
    useState(true);

  const [transactionError, setTransactionError] =
    useState("");

  const [showHistory, setShowHistory] =
    useState(false);

  // ============================================================
  // LOAD INCOMING LOVE HISTORY
  // ============================================================

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoadingHistory(true);
        setTransactionError("");

        const data = await getTransactions(
          account.id
        );

        setTransactions(data);
      } catch (error) {
        console.error(error);

        setTransactionError(
          "Unable to load love history."
        );
      } finally {
        setLoadingHistory(false);
      }
    };

    loadTransactions();
  }, [account.id]);

  // ============================================================
  // LOVE ACTION
  // ============================================================

  const handleLoveAction = (action) => {
    setActiveAction(action);
  };

  // ============================================================
  // SAVE TRANSACTION
  // ============================================================

  const handleTransaction = async (
    transaction
  ) => {
    try {
      setTransactionError("");

      const savedTransaction =
        await createTransaction({
          senderId: account.id,
          receiverId: receiver.id,
          type: transaction.type,
          amount: transaction.amount,
          message: transaction.message,
        });

      /*
       * This transaction was SENT by the current
       * account, so don't add it to the current
       * account's incoming history.
       *
       * It will appear in the receiver's history
       * when they log in.
       */

      setActiveAction(null);

      /*
       * Small success state.
       * We don't need to display the sent
       * transaction in incoming history.
       */

      console.log(
        "LOVE SENT:",
        savedTransaction
      );
    } catch (error) {
      console.error(error);

      setTransactionError(
        "Unable to send love. Please try again."
      );
    }
  };

  // ============================================================
  // DISPLAY HELPERS
  // ============================================================

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

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString(
      "en-PH",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  const formatShortDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString(
      "en-PH",
      {
        month: "short",
        day: "numeric",
      }
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

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

          {/* ==================================================
              WELCOME
          ================================================== */}

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

          {/* ==================================================
              LOVE BALANCE
          ================================================== */}

          <div className="love-balance">

            <div className="balance-top">
              <span>
                LOVE BALANCE
              </span>

              <span>
                ♡
              </span>
            </div>

            <div className="balance-number">
              1,000
            </div>

            <div className="balance-label">
              LOVE POINTS
            </div>

          </div>

          {/* ==================================================
              ACTIONS
          ================================================== */}

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
                <strong>
                  Send Kisses
                </strong>

                <small>
                  Give some kisses
                </small>
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
                <strong>
                  Send Hugs
                </strong>

                <small>
                  Send a warm hug
                </small>
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
                <strong>
                  Love Points
                </strong>

                <small>
                  Send some love
                </small>
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
                <strong>
                  Love Letter
                </strong>

                <small>
                  Write something sweet
                </small>
              </div>

              <span className="action-arrow">
                →
              </span>
            </button>

          </div>

          {/* ==================================================
              ERROR
          ================================================== */}

          {transactionError && (
            <div className="transaction-error">
              {transactionError}
            </div>
          )}

          {/* ==================================================
              RECENT LOVE
          ================================================== */}

          <div className="dashboard-section">

            <div className="section-heading">

              <div>
                <span className="small-label">
                  RECEIVED LOVE
                </span>

                <h2>
                  From {receiver.name}
                </h2>
              </div>

              <button
                className="history-button"
                type="button"
                onClick={() =>
                  setShowHistory(true)
                }
              >
                VIEW HISTORY
              </button>

            </div>

            {loadingHistory ? (
              <div className="empty-transactions">

                <div className="empty-icon">
                  ♡
                </div>

                <strong>
                  Loading love...
                </strong>

                <p>
                  Getting your memories.
                </p>

              </div>
            ) : transactions.length === 0 ? (
              <div className="empty-transactions">

                <div className="empty-icon">
                  ♡
                </div>

                <strong>
                  No love received yet
                </strong>

                <p>
                  Your first cute moment will
                  appear here.
                </p>

              </div>
            ) : (
              <div className="transaction-list">

                {transactions
                  .slice(0, 3)
                  .map((transaction) => (
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
                          From{" "}
                          {transaction.sender_id.toUpperCase()}
                        </span>

                        {transaction.message && (
                          <p>
                            "{transaction.message}"
                          </p>
                        )}

                        <small className="transaction-date">
                          {formatShortDate(
                            transaction.created_at
                          )}
                        </small>

                      </div>

                      {transaction.amount > 0 && (
                        <strong className="transaction-amount">
                          +{transaction.amount}
                        </strong>
                      )}

                    </div>
                  ))}

              </div>
            )}

          </div>

          {/* ==================================================
              LOVE EMERGENCY
          ================================================== */}

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

      {/* ======================================================
          SEND LOVE MODAL
      ====================================================== */}

      {activeAction && (
        <LoveActionModal
          action={activeAction}
          receiver={receiver}
          onClose={() =>
            setActiveAction(null)
          }
          onSubmit={handleTransaction}
        />
      )}

      {/* ======================================================
          HISTORY MODAL
      ====================================================== */}

      {showHistory && (
        <div
          className="history-modal-overlay"
          onClick={() =>
            setShowHistory(false)
          }
        >
          <div
            className={`history-modal ${
              isIvan
                ? "history-modal-ivan"
                : "history-modal-sam"
            }`}
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="history-modal-close"
              type="button"
              onClick={() =>
                setShowHistory(false)
              }
            >
              ×
            </button>

            <div className="history-modal-icon">
              ♡
            </div>

            <span className="small-label">
              LOVE ARCHIVE
            </span>

            <h2>
              Your Love History
            </h2>

            <p className="history-modal-subtitle">
              Every little bit of love from{" "}
              {receiver.name}.
            </p>

            <div className="history-modal-list">

              {transactions.length === 0 ? (
                <div className="history-empty">
                  <div>
                    ♡
                  </div>

                  <strong>
                    Nothing here yet.
                  </strong>

                  <p>
                    Your love story is still
                    waiting for its first entry.
                  </p>
                </div>
              ) : (
                transactions.map(
                  (transaction) => (
                    <div
                      className="history-item"
                      key={transaction.id}
                    >

                      <div className="history-item-icon">
                        {getTransactionIcon(
                          transaction.type
                        )}
                      </div>

                      <div className="history-item-content">

                        <div className="history-item-top">

                          <strong>
                            {getTransactionName(
                              transaction.type
                            )}
                          </strong>

                          {transaction.amount > 0 && (
                            <span>
                              +{transaction.amount}
                            </span>
                          )}

                        </div>

                        <small>
                          From{" "}
                          {transaction.sender_id.toUpperCase()}
                        </small>

                        {transaction.message && (
                          <p>
                            "{transaction.message}"
                          </p>
                        )}

                        <time>
                          {formatDate(
                            transaction.created_at
                          )}
                        </time>

                      </div>

                    </div>
                  )
                )
              )}

            </div>

            <button
              className="history-done-button"
              type="button"
              onClick={() =>
                setShowHistory(false)
              }
            >
              CLOSE HISTORY
            </button>

          </div>
        </div>
      )}

    </section>
  );
}

export default Dashboard;