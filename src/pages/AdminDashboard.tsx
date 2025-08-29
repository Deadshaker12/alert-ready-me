import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCard, Alert, AlertSeverity, AlertType } from '@/components/AlertCard';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Plus, Shield, Users, AlertTriangle, LogOut } from 'lucide-react';

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Severe Weather Warning',
    description: 'Heavy thunderstorms expected with potential for hail and strong winds.',
    severity: 'warning',
    type: 'weather',
    location: 'Downtown Metro Area',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    active: true
  },
  {
    id: '2',
    title: 'Flash Flood Emergency',
    description: 'Immediate evacuation recommended for low-lying areas near the river.',
    severity: 'emergency',
    type: 'flood',
    location: 'Riverside District',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    active: true
  }
];

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    severity: 'watch' as AlertSeverity,
    type: 'weather' as AlertType,
    location: ''
  });

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const alert: Alert = {
      id: Date.now().toString(),
      ...newAlert,
      timestamp: new Date(),
      active: true
    };
    
    setAlerts([alert, ...alerts]);
    setNewAlert({
      title: '',
      description: '',
      severity: 'watch',
      type: 'weather',
      location: ''
    });
    setShowCreateForm(false);
    
    toast({
      title: "Alert created",
      description: "New emergency alert has been broadcast to all citizens.",
    });
  };

  const toggleAlertStatus = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, active: !alert.active }
        : alert
    ));
  };

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
                <p className="text-sm text-muted-foreground">Administrator Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.filter(a => a.active).length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Citizens</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,456</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emergency Level</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">Elevated</div>
            </CardContent>
          </Card>
        </div>

        {/* Create Alert Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Emergency Alerts</h2>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </div>

          {showCreateForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateAlert} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Alert Title</Label>
                      <Input
                        id="title"
                        value={newAlert.title}
                        onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newAlert.location}
                        onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newAlert.description}
                      onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Severity Level</Label>
                      <Select value={newAlert.severity} onValueChange={(value) => setNewAlert({...newAlert, severity: value as AlertSeverity})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="watch">Watch</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Alert Type</Label>
                      <Select value={newAlert.type} onValueChange={(value) => setNewAlert({...newAlert, type: value as AlertType})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weather">Weather</SelectItem>
                          <SelectItem value="flood">Flood</SelectItem>
                          <SelectItem value="earthquake">Earthquake</SelectItem>
                          <SelectItem value="fire">Fire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit">Create Alert</Button>
                    <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-center gap-4">
              <div className="flex-1">
                <AlertCard alert={alert} compact />
              </div>
              <Button
                variant={alert.active ? "destructive" : "default"}
                onClick={() => toggleAlertStatus(alert.id)}
              >
                {alert.active ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};