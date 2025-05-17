
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type Challenge = Database["public"]["Tables"]["challenges"]["Row"];
export type Submission = Database["public"]["Tables"]["submissions"]["Row"];

export const fetchSponsorChallenges = async () => {
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching challenges:", error);
    throw error;
  }

  return data;
};

export const createChallenge = async (challenge: Omit<Challenge, "id" | "created_at" | "updated_at" | "sponsor_id">) => {
  const { data, error } = await supabase
    .from("challenges")
    .insert([{ ...challenge }])
    .select()
    .single();

  if (error) {
    console.error("Error creating challenge:", error);
    throw error;
  }

  return data;
};

export const updateChallenge = async (id: string, challenge: Partial<Omit<Challenge, "id" | "created_at" | "updated_at" | "sponsor_id">>) => {
  const { data, error } = await supabase
    .from("challenges")
    .update({ ...challenge, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating challenge:", error);
    throw error;
  }

  return data;
};

export const fetchChallengeSubmissions = async (challengeId: string) => {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("challenge_id", challengeId)
    .order("score", { ascending: false });

  if (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }

  return data;
};
