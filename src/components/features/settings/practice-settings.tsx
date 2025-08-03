"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface PracticeSettingsProps {
  className?: string
}

export function PracticeSettings({ className }: PracticeSettingsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-medium">Practice Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your dental practice information and configuration
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Practice Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Practice settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
