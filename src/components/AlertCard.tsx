import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Cloud, Waves, Zap } from "lucide-react";

export type AlertSeverity = 'watch' | 'warning' | 'emergency';
export type AlertType = 'weather' | 'flood' | 'earthquake' | 'fire';

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  type: AlertType;
  location: string;
  timestamp: Date;
  active: boolean;
}

const severityConfig = {
  watch: {
    color: 'safe' as const,
    label: 'Watch'
  },
  warning: {
    color: 'warning' as const,
    label: 'Warning'
  },
  emergency: {
    color: 'emergency' as const,
    label: 'Emergency'
  }
};

const typeIcons = {
  weather: Cloud,
  flood: Waves,
  earthquake: AlertTriangle,
  fire: Zap
};

interface AlertCardProps {
  alert: Alert;
  compact?: boolean;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, compact = false }) => {
  const config = severityConfig[alert.severity];
  const Icon = typeIcons[alert.type];
  
  return (
    <Card className={`border-l-4 ${
      alert.severity === 'emergency' ? 'border-l-emergency' :
      alert.severity === 'warning' ? 'border-l-warning' : 
      'border-l-safe'
    }`}>
      <CardHeader className={compact ? "pb-2" : ""}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <CardTitle className={compact ? "text-lg" : "text-xl"}>{alert.title}</CardTitle>
          </div>
          <Badge 
            variant="secondary"
            className={`
              ${alert.severity === 'emergency' ? 'bg-emergency text-emergency-foreground' :
                alert.severity === 'warning' ? 'bg-warning text-warning-foreground' : 
                'bg-safe text-safe-foreground'}
            `}
          >
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-2">{alert.description}</p>
        <div className="flex justify-between text-sm">
          <span className="font-medium">{alert.location}</span>
          <span className="text-muted-foreground">
            {alert.timestamp.toLocaleDateString()} {alert.timestamp.toLocaleTimeString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};