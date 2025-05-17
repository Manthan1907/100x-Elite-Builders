import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type Challenge = Database["public"]["Tables"]["challenges"]["Row"];
export type Submission = Database["public"]["Tables"]["submissions"]["Row"] & {
  user_name?: string | null;
  user_avatar?: string | null;
};

// Define a type for submission data from the form
type SubmissionFormData = {
  challenge_id: string;
  repository_url: string;
  description: string;
  demo_url?: string | null;
  additionalNotes?: string | null;
};

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
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user?.id) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from("challenges")
    .insert([{ ...challenge, sponsor_id: session.session.user.id }])
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

// Function to create a new submission
export const createSubmission = async (submissionData: Omit<Submission, "id" | "created_at" | "updated_at" | "user_id" | "score" | "status" | "submission_date" | "title" | "feedback" | "user_name" | "user_avatar">) => {
  console.log("Inside createSubmission function");
  try {
    console.log("Starting submission creation with data:", submissionData);
    
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log("Session data:", sessionData);
    console.log("Session error:", sessionError);

    if (sessionError || !sessionData?.session?.user) {
      console.error("Authentication error:", sessionError);
      throw new Error("User not authenticated");
    }

    const user = sessionData.session.user;
    const userId = user.id;
    console.log("User ID:", userId);

    // Get user metadata
    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log("User data:", userData);
    console.log("User error:", userError);
    
    if (userError) {
      console.error("Error getting user data:", userError);
      throw userError;
    }

    // Get name from metadata or fallback to email
    const userName = userData.user?.user_metadata?.name || user.email?.split('@')[0] || 'Unknown User';
    const userAvatar = userData.user?.user_metadata?.avatar_url || null;
    console.log("User name:", userName);
    console.log("User avatar:", userAvatar);

    // Validate required fields
    if (!submissionData.challenge_id) {
      throw new Error("Challenge ID is required");
    }
    if (!submissionData.repository_url) {
      throw new Error("Repository URL is required");
    }
    if (!submissionData.description) {
      throw new Error("Description is required");
    }

    const submissionToInsert = {
      ...submissionData,
      user_id: userId,
      user_name: userName,
      user_avatar: userAvatar,
      status: "under-review",
      submission_date: new Date().toISOString(),
      title: submissionData.description.substring(0, 50) + '...',
      score: 0, // Initialize score as 0
    };
    console.log("Submission to insert:", submissionToInsert);

    // First, check if a submission already exists for this user and challenge
    console.log("Checking for existing submission...");
    const { data: existingSubmission, error: checkError } = await supabase
      .from("submissions")
      .select("*")
      .eq("challenge_id", submissionData.challenge_id)
      .eq("user_id", userId)
      .single();
    
    console.log("Existing submission check data:", existingSubmission);
    console.log("Existing submission check error:", checkError);

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error("Error checking existing submission:", checkError);
      throw checkError;
    }

    if (existingSubmission) {
      console.log("Existing submission found. Attempting to update:", existingSubmission.id);
      const { data, error } = await supabase
        .from("submissions")
        .update(submissionToInsert)
        .eq("id", existingSubmission.id)
        .select()
        .single();

      if (error) {
        console.error("Supabase Update Error:", error.message, error.details, error);
        throw error;
      }

      console.log("Successfully updated submission:", data);
      return data;
    }

    // If no existing submission, create new one
    console.log("No existing submission found. Attempting to insert new submission...");
    const { data, error } = await supabase
      .from("submissions")
      .insert([submissionToInsert])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error.message, error.details, error);
      throw error;
    }

    console.log("Successfully created new submission:", data);
    return data;
  } catch (error) {
    console.error("Error in createSubmission function catch block:", error.message, error);
    throw error;
  }
};

export const fetchChallengeSubmissions = async (challengeId: string) => {
  try {
    console.log("Fetching submissions for challenge:", challengeId);
    
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("challenge_id", challengeId)
      .order("score", { ascending: false });

    if (error) {
      console.error("Error fetching submissions:", error);
      throw error;
    }

    console.log("Fetched submissions:", data);
    return data || [];
  } catch (error) {
    console.error("Error in fetchChallengeSubmissions:", error);
    throw error;
  }
};

export const fetchAllSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from("submissions")
      .select("*") // Select all columns, including user_name, user_avatar, score, challenge_id, title
      .order("score", { ascending: false }); // Order by score for global ranking

    if (error) {
      console.error("Error fetching all submissions:", error);
      throw error;
    }

    // We might need to group/process this data in the component for global ranking
    // For now, returning all submissions
    return data || [];
  } catch (error) {
    console.error("Error in fetchAllSubmissions:", error);
    throw error;
  }
};

export const fetchChallengeById = async (id: string) => {
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching challenge by id:", error);
    throw error;
  }
  return data;
};

export const fetchAllChallenges = async () => {
  try {
    const { data, error } = await supabase
      .from("challenges")
      .select("id, title") // Select only the necessary fields
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all challenges:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in fetchAllChallenges:", error);
    throw error;
  }
};

// Function to fetch submissions for the logged-in user
export const fetchUserSubmissions = async () => {
  try {
    console.log("Fetching submissions for logged-in user");

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session?.user) {
      console.error("Authentication error:", sessionError);
      throw new Error("User not authenticated");
    }

    const userId = sessionData.session.user.id;
    console.log("Fetching submissions for User ID:", userId);

    const { data, error } = await supabase
      .from("submissions")
      .select("*, challenges(title)") // Select submission data and join with challenges table to get challenge title
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching user submissions:", error);
      throw error;
    }

    console.log("Fetched user submissions:", data);
    return data || [];
  } catch (error) {
    console.error("Error fetching user submissions:", error);
    throw error;
  }
};

// Function to approve a submission (backend mechanism)
export const approveSubmission = async (submissionId: string) => {
  try {
    console.log("Attempting to approve submission:", submissionId);

    // In a real application, you would add authorization checks here
    // to ensure only the challenge sponsor can approve.
    // RLS in Supabase is the recommended way to enforce this securely.

    const { data, error } = await supabase
      .from("submissions")
      .update({ status: 'approved' })
      .eq("id", submissionId)
      .select()
      .single();

    if (error) {
      console.error("Error approving submission:", error);
      throw error;
    }

    console.log("Submission successfully approved:", data);
    return data;
  } catch (error) {
    console.error("Error in approveSubmission:", error);
    throw error;
  }
};
