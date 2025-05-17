import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: "candidate" | "sponsor";
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setUserRole(null);
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        setUserRole(user?.user_metadata?.user_type || null);
      } catch (error) {
        console.error("Error checking user role:", error);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userRole) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== allowedRole) {
    // Redirect to appropriate dashboard if role doesn't match
    return <Navigate to={`/${userRole}-dashboard`} replace />;
  }

  return <>{children}</>;
} 