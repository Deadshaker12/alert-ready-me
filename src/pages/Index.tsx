import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/AuthForm';
import { VerificationForm } from '@/components/VerificationForm';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { CitizenDashboard } from '@/pages/CitizenDashboard';
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Bell, Users } from 'lucide-react';
import heroImage from '@/assets/hero-emergency.jpg';

const AppContent = () => {
  const { user, isAuthenticated } = useAuth();
  const [showVerification, setShowVerification] = useState(false);

  if (isAuthenticated && user) {
    return user.role === 'administrator' ? <AdminDashboard /> : <CitizenDashboard />;
  }

  if (showVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <VerificationForm onBack={() => setShowVerification(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold mb-2">Beware Me</h1>
                    <p className="text-xl text-white/90">Natural Disaster Alert System</p>
                  </div>
                </div>
                
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Stay informed and protected with real-time emergency alerts, weather warnings, 
                  and disaster notifications. Our comprehensive alert system keeps communities 
                  safe with instant notifications and emergency response coordination.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <AlertTriangle className="h-8 w-8 text-warning mb-2" />
                    <h3 className="font-semibold mb-1">Real-time Alerts</h3>
                    <p className="text-sm text-white/80">Instant emergency notifications</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <Bell className="h-8 w-8 text-safe mb-2" />
                    <h3 className="font-semibold mb-1">Multi-Channel</h3>
                    <p className="text-sm text-white/80">SMS, email, and app alerts</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <Users className="h-8 w-8 text-accent mb-2" />
                    <h3 className="font-semibold mb-1">Community Safe</h3>
                    <p className="text-sm text-white/80">Protecting entire communities</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Emergency Alerts
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Auth Form */}
              <div>
                <AuthForm onVerificationNeeded={() => setShowVerification(true)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Emergency Management</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for both emergency administrators and citizens, our platform ensures 
              everyone stays informed and prepared during critical situations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* For Citizens */}
            <div className="text-center">
              <div className="w-16 h-16 bg-safe/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-safe" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Citizens</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-safe rounded-full"></div>
                  Receive instant emergency alerts
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-safe rounded-full"></div>
                  Location-based notifications
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-safe rounded-full"></div>
                  Emergency contact information
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-safe rounded-full"></div>
                  Safety instructions and guidance
                </li>
              </ul>
            </div>

            {/* For Administrators */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Administrators</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Create and manage emergency alerts
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Real-time citizen statistics
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Multi-level severity system
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Comprehensive alert management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
