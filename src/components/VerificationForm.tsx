import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

interface VerificationFormProps {
  onBack: () => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({ onBack }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyAccount } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await verifyAccount(code);
      if (success) {
        toast({
          title: "Account verified!",
          description: "Your account has been successfully verified.",
        });
      } else {
        toast({
          title: "Invalid code",
          description: "Please check your verification code and try again.",
          variant: "destructive"
        });
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
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Account</CardTitle>
        <p className="text-muted-foreground">
          Enter the 6-digit code sent to your email address
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-widest"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading || code.length !== 6}>
            {loading ? 'Verifying...' : 'Verify Account'}
          </Button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <Button variant="link" className="text-sm">
            Resend verification code
          </Button>
          <br />
          <Button variant="link" className="text-sm" onClick={onBack}>
            Back to sign in
          </Button>
        </div>

        <div className="mt-4 p-3 bg-muted rounded-md text-xs text-muted-foreground">
          <strong>Demo:</strong> Enter any 6-digit code (e.g., 123456)
        </div>
      </CardContent>
    </Card>
  );
};