"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Building2,
  MapPin,
  Phone,
  Globe,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  DollarSign
} from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to Dental Analytics",
    description: "Let's get your practice set up for success",
    icon: Sparkles
  },
  {
    id: "practice",
    title: "Practice Information",
    description: "Tell us about your dental practice",
    icon: Building2
  },
  {
    id: "goals",
    title: "Your Goals",
    description: "What would you like to achieve?",
    icon: Target
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "Welcome to your analytics dashboard",
    icon: CheckCircle
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [practiceData, setPracticeData] = useState({
    practiceName: "",
    address: "",
    phone: "",
    website: "",
    practiceType: "",
    teamSize: "",
    currentPatients: "",
    monthlyGoal: "",
    primaryGoals: [] as string[]
  })

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  const handleInputChange = (field: string, value: string) => {
    setPracticeData(prev => ({ ...prev, [field]: value }))
  }

  const handleGoalToggle = (goal: string) => {
    setPracticeData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : [...prev.primaryGoals, goal]
    }))
  }

  const handleNext = async () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      // Simulate saving onboarding data
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Redirect to dashboard
      window.location.href = "/ads"
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderWelcomeStep = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Welcome to Dental Analytics!</h2>
        <p className="text-muted-foreground">
          You're about to join thousands of dental professionals who are growing their practices with data-driven insights.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 border rounded-lg">
          <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="font-medium">Quick Setup</div>
          <div className="text-muted-foreground">Get started in under 5 minutes</div>
        </div>
        <div className="p-4 border rounded-lg">
          <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="font-medium">Proven Results</div>
          <div className="text-muted-foreground">Average 905% ROI</div>
        </div>
        <div className="p-4 border rounded-lg">
          <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="font-medium">Expert Support</div>
          <div className="text-muted-foreground">24/7 help when you need it</div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-blue-900">Your Pricing</span>
        </div>
        <div className="text-sm text-blue-800">
          <div>Setup Fee: $300 (includes 10 free appointments)</div>
          <div>Then: $97/month + $50 per appointment after first 10</div>
        </div>
      </div>
    </div>
  )

  const renderPracticeStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-bold">Tell us about your practice</h2>
        <p className="text-muted-foreground">
          This helps us customize your experience and provide relevant insights.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="practiceName">Practice Name</Label>
          <Input
            id="practiceName"
            value={practiceData.practiceName}
            onChange={(e) => handleInputChange("practiceName", e.target.value)}
            placeholder="Denver Family Dentistry"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Practice Address</Label>
          <Input
            id="address"
            value={practiceData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="123 Main Street, Denver, CO 80202"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={practiceData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              value={practiceData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="www.yourpractice.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="practiceType">Practice Type</Label>
          <select
            id="practiceType"
            value={practiceData.practiceType}
            onChange={(e) => handleInputChange("practiceType", e.target.value)}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">Select practice type</option>
            <option value="general">General Dentistry</option>
            <option value="orthodontics">Orthodontics</option>
            <option value="oral-surgery">Oral Surgery</option>
            <option value="pediatric">Pediatric Dentistry</option>
            <option value="cosmetic">Cosmetic Dentistry</option>
            <option value="periodontics">Periodontics</option>
            <option value="endodontics">Endodontics</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teamSize">Team Size</Label>
            <select
              id="teamSize"
              value={practiceData.teamSize}
              onChange={(e) => handleInputChange("teamSize", e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select team size</option>
              <option value="1-5">1-5 people</option>
              <option value="6-10">6-10 people</option>
              <option value="11-20">11-20 people</option>
              <option value="21+">21+ people</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentPatients">Current Patients</Label>
            <select
              id="currentPatients"
              value={practiceData.currentPatients}
              onChange={(e) => handleInputChange("currentPatients", e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select patient count</option>
              <option value="0-500">0-500 patients</option>
              <option value="501-1000">501-1,000 patients</option>
              <option value="1001-2000">1,001-2,000 patients</option>
              <option value="2001+">2,001+ patients</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderGoalsStep = () => {
    const goals = [
      { id: "appointments", label: "Increase Appointments", description: "Get more patients scheduled" },
      { id: "revenue", label: "Boost Revenue", description: "Increase practice income" },
      { id: "marketing", label: "Improve Marketing ROI", description: "Get better results from ads" },
      { id: "retention", label: "Patient Retention", description: "Keep patients coming back" },
      { id: "efficiency", label: "Operational Efficiency", description: "Streamline practice operations" },
      { id: "competition", label: "Competitive Analysis", description: "Stay ahead of competitors" }
    ]

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold">What are your main goals?</h2>
          <p className="text-muted-foreground">
            Select all that apply. We'll customize your dashboard to help you achieve these goals.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyGoal">Monthly Appointment Goal</Label>
          <Input
            id="monthlyGoal"
            type="number"
            value={practiceData.monthlyGoal}
            onChange={(e) => handleInputChange("monthlyGoal", e.target.value)}
            placeholder="e.g., 50"
          />
          <p className="text-xs text-muted-foreground">
            How many new appointments would you like to generate per month?
          </p>
        </div>

        <div className="space-y-3">
          <Label>Primary Goals (Select all that apply)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => handleGoalToggle(goal.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  practiceData.primaryGoals.includes(goal.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{goal.label}</div>
                    <div className="text-sm text-muted-foreground">{goal.description}</div>
                  </div>
                  {practiceData.primaryGoals.includes(goal.id) && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderCompleteStep = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">You're all set!</h2>
        <p className="text-muted-foreground">
          Welcome to Dental Analytics. Your dashboard is ready and customized for your practice.
        </p>
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Your dashboard is being customized based on your goals</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>We'll start tracking your practice analytics immediately</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Our team will reach out within 24 hours to help you get started</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Need help getting started?{" "}
        <a href="/support" className="text-primary hover:underline">
          Contact our support team
        </a>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderWelcomeStep()
      case 1:
        return renderPracticeStep()
      case 2:
        return renderGoalsStep()
      case 3:
        return renderCompleteStep()
      default:
        return renderWelcomeStep()
    }
  }

  const currentStepData = onboardingSteps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="size-4" />
            </div>
            <span className="font-semibold text-lg">Dental Analytics</span>
          </div>
          <Badge variant="secondary">
            Step {currentStep + 1} of {onboardingSteps.length}
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Main Content */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </CardHeader>
            <CardContent>
              {renderCurrentStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Setting up...
                </>
              ) : currentStep === onboardingSteps.length - 1 ? (
                <>
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
