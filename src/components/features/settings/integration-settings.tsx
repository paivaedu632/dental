"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface IntegrationSettingsProps {
  className?: string
}

export function IntegrationSettings({ className }: IntegrationSettingsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-medium">Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect with third-party services and manage API integrations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Available Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Integration settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
