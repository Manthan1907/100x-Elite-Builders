import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      setUserEmail(data.session?.user.email || null);
      if (data.session) {
        // Fetch user role from metadata
        const { data: userData } = await supabase.auth.getUser();
        setUserRole(userData?.user?.user_metadata?.user_type || null);
      } else {
        setUserRole(null);
      }
    };
    
    checkSession();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setUserEmail(session?.user.email || null);
      if (session) {
        supabase.auth.getUser().then(({ data: userData }) => {
          setUserRole(userData?.user?.user_metadata?.user_type || null);
        });
      } else {
        setUserRole(null);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account"
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };
  
  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left section: Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold font-['Helvetica']">
              <span className="text-coral-500">100x</span><span className="text-foreground"> Elite Builders</span>
            </div>
          </Link>
        </div>

        {/* Center section: Navigation links */}
        <div className="hidden md:flex items-center justify-center flex-grow">
          <div className="flex items-center space-x-6">
            <Link to="/challenges" className="text-base font-medium transition-colors hover:text-primary font-['Helvetica']">
              Challenges
            </Link>
            <Link to="/leaderboard" className="text-base font-medium transition-colors hover:text-primary font-['Helvetica']">
              Leaderboard
            </Link>
            <Link to="/sponsors" className="text-base font-medium transition-colors hover:text-primary font-['Helvetica']">
              Sponsors
            </Link>
            {isLoggedIn && userRole && (
              <Link to={`/${userRole}-dashboard`} className="text-base font-medium transition-colors hover:text-primary font-['Helvetica']">
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Right section: Auth buttons/Dropdown */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="@user" />
                    <AvatarFallback>{userEmail ? userEmail[0].toUpperCase() : 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail || 'user@example.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate('/login')} variant="ghost">
                Login
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
