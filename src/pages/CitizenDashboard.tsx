import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCard, Alert } from '@/components/AlertCard';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from "@/components/ui/badge";
import { User, LogOut, Bell, Shield, MapPin } from 'lucide-react';

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Severe Weather Warning',
    description: 'Heavy thunderstorms expected with potential for hail and strong winds. Avoid unnecessary travel.',
    severity: 'warning',
    type: 'weather',
    location: 'Downtown Metro Area',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    active: true
  },
  {
    id: '2',
    title: 'Flash Flood Emergency',
    description: 'Immediate evacuation recommended for low-lying areas near the river. Seek higher ground immediately.',
    severity: 'emergency',
    type: 'flood',
    location: 'Riverside District',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    active: true
  },
  {
    id: '3',
    title: 'Air Quality Advisory',
    description: 'Moderate air quality due to wildfire smoke. Sensitive individuals should limit outdoor activities.',
    severity: 'watch',
    type: 'weather',
    location: 'City-wide',
    timestamp: new Date(Date.now() - 120 * 60 * 1000),
    active: true
  }
];

export const CitizenDashboard = () => {
  const { user, logout } = useAuth();
  const [alerts] = useState<Alert[]>(mockAlerts);
  
  const activeAlerts = alerts.filter(alert => alert.active);
  const emergencyAlerts = activeAlerts.filter(alert => alert.severity === 'emergency');
  const warningAlerts = activeAlerts.filter(alert => alert.severity === 'warning');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Beware Me</h1>
                <p className="text-sm text-muted-foreground">Citizen Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  {user?.name}
                </span>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Alert Status */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Bell className="h-6 w-6" />
              <h2 className="text-2xl font-semibold">Current Alert Status</h2>
            </div>
            {emergencyAlerts.length > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                EMERGENCY ACTIVE
              </Badge>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className={emergencyAlerts.length > 0 ? "border-emergency" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emergency</CardTitle>
                <div className="w-3 h-3 rounded-full bg-emergency"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{emergencyAlerts.length}</div>
              </CardContent>
            </Card>

            <Card className={warningAlerts.length > 0 ? "border-warning" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{warningAlerts.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Active</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeAlerts.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Area</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">Downtown</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Instructions */}
        {emergencyAlerts.length > 0 && (
          <Card className="border-emergency bg-emergency/5 mb-8">
            <CardHeader>
              <CardTitle className="text-emergency flex items-center gap-2">
                <Bell className="h-5 w-5" />
                EMERGENCY INSTRUCTIONS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Stay calm</strong> and follow official instructions</li>
                <li>• <strong>Stay indoors</strong> unless evacuation is ordered</li>
                <li>• <strong>Monitor alerts</strong> for updates</li>
                <li>• <strong>Have emergency supplies</strong> ready</li>
                <li>• <strong>Contact emergency services</strong> only if in immediate danger</li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Active Alerts */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Active Alerts in Your Area</h3>
          
          {activeAlerts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Shield className="h-12 w-12 text-safe mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-safe mb-2">All Clear</h3>
                <p className="text-muted-foreground">
                  No active alerts in your area. Stay prepared and check back regularly.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Emergency alerts first */}
              {emergencyAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
              
              {/* Then warning alerts */}
              {warningAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
              
              {/* Finally watch alerts */}
              {activeAlerts.filter(alert => alert.severity === 'watch').map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          )}
        </div>

        {/* Emergency Contacts */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Emergency Services:</strong><br />
                911
              </div>
              <div>
                <strong>Non-Emergency:</strong><br />
                (555) 123-4567
              </div>
              <div>
                <strong>Emergency Management:</strong><br />
                (555) 987-6543
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};