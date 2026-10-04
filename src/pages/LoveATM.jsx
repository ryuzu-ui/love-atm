import { useState } from "react";

import WelcomeScreen from "../components/WelcomeScreen";
import AccountSelection from "../components/AccountSelection";
import PinScreen from "../components/PinScreen";
import Dashboard from "../components/Dashboard";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

import "../styles/variables.css";
import "../styles/global.css";

function LoveATM() {
  const [screen, setScreen] = useState("welcome");
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleStart = () => {
    setScreen("accounts");
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setScreen("pin");
  };

  const handlePinSuccess = () => {
    setScreen("dashboard");
  };

  const handleBackToWelcome = () => {
    setSelectedAccount(null);
    setScreen("welcome");
  };

  const handleBackToAccounts = () => {
    setSelectedAccount(null);
    setScreen("accounts");
  };

  const handleLogout = () => {
    setSelectedAccount(null);
    setScreen("welcome");
  };

  useEffect(() => {
  const testSupabase = async () => {
    const { error } = await supabase
      .from("love_transactions")
      .select("id")
      .limit(1);

    if (error) {
      console.error("SUPABASE CONNECTION ERROR:", error);
      return;
    }

    console.log("SUPABASE CONNECTED SUCCESSFULLY!");
  };

  testSupabase();
}, []);

  return (
    <main className="love-atm">

      {screen === "welcome" && (
        <WelcomeScreen
          onStart={handleStart}
        />
      )}

      {screen === "accounts" && (
        <AccountSelection
          onSelectAccount={handleAccountSelect}
          onBack={handleBackToWelcome}
        />
      )}

      {screen === "pin" && selectedAccount && (
        <PinScreen
          account={selectedAccount}
          onSuccess={handlePinSuccess}
          onBack={handleBackToAccounts}
        />
      )}

      {screen === "dashboard" && selectedAccount && (
        <Dashboard
          account={selectedAccount}
          onLogout={handleLogout}
        />
      )}

    </main>
  );
}

export default LoveATM;