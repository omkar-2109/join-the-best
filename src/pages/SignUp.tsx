import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email || !password) {
      toast.error("Please fill all required fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { error } = await signUp(email, password);
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src="/favicon.png" alt="BBS Logo" className="h-10 w-10 rounded-lg" />
              <span className="font-display text-xl font-bold text-foreground">BBS</span>
            </Link>
          </div>
          <Card className="shadow-premium">
            <CardContent className="py-10 text-center space-y-4">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="font-display text-2xl font-bold text-foreground">Check Your Email</h2>
              <p className="text-muted-foreground">
                We've sent a verification link to <strong className="text-foreground">{email}</strong>. 
                Please verify your email before signing in.
              </p>
              <Button asChild className="mt-4 bg-primary text-primary-foreground">
                <Link to="/login">Go to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src="/favicon.png" alt="BBS Logo" className="h-10 w-10 rounded-lg" />
            <span className="font-display text-xl font-bold text-foreground">BBS</span>
          </Link>
        </div>

        <Card className="shadow-premium">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">Create Account</CardTitle>
            <CardDescription>Register with your email to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input id="confirmPassword" type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-gold-dark" disabled={loading}>
                {loading ? "Creating Account..." : "Register"}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
