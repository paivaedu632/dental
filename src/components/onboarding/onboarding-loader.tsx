export function OnboardingLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          Processing your payment...
        </h2>
        <p className="text-gray-600">
          You'll be redirected to setup in a moment.
        </p>
      </div>
    </div>
  )
}