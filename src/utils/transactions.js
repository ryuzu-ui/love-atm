import { supabase } from "../lib/supabase";

export async function createTransaction({
  senderId,
  receiverId,
  type,
  amount,
  message,
}) {
  const { data, error } = await supabase
    .from("love_transactions")
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      type,
      amount,
      message: message || null,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "CREATE TRANSACTION ERROR:",
      error
    );

    throw error;
  }

  return data;
}

export async function getTransactions(receiverId) {
  const { data, error } = await supabase
    .from("love_transactions")
    .select("*")
    .eq("receiver_id", receiverId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "GET TRANSACTIONS ERROR:",
      error
    );

    throw error;
  }

  return data || [];
}