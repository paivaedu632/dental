"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface ReferralSettingsProps {
  className?: string
}

export function ReferralSettings({ className }: ReferralSettingsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-medium">Referral Program</h3>
        <p className="text-sm text-muted-foreground">
          Invite colleagues and earn rewards through our referral program
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Referral program settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
