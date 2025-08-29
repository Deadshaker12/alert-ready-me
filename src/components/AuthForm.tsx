import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Shield, User } from 'lucide-react';

interface AuthFormProps {
  onVerificationNeeded: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onVerificationNeeded }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(email, password);
        if (success) {
          toast({
            title: "Welcome back!",
            description: "You have been successfully logged in.",
          });
        } else {
          // Check if account needs verification
          onVerificationNeeded();
          toast({
            title: "Account not verified",
            description: "Please verify your account with the code sent to your email.",
            variant: "destructive"
          });
        }
      } else {
        const success = await register(email, password, name, role);
        if (success) {
          onVerificationNeeded();
          toast({
            title: "Account created!",
            description: "Please check your email for verification code.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {isLogin ? 'Sign In' : 'Create Account'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="space-y-3">
              <Label>Account Type</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="citizen" id="citizen" />
                  <Label htmlFor="citizen" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Citizen
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="administrator" id="administrator" />
                  <Label htmlFor="administrator" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Administrator
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </div>

        {isLogin && (
          <div className="mt-4 p-3 bg-muted rounded-md text-xs text-muted-foreground">
            <strong>Demo accounts:</strong><br />
            Admin: admin@bewareme.com<br />
            Citizen: citizen@bewareme.com<br />
            Password: any
          </div>
        )}
      </CardContent>
    </Card>
  );
};