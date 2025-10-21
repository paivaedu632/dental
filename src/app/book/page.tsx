import BookingForm from "@/components/booking/booking-form"

export default function BookPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const dentistId = searchParams?.dentist_id
  const dentistSlug = searchParams?.slug || searchParams?.dentist_slug

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
        <BookingForm dentistId={dentistId} dentistSlug={dentistSlug} />
      </div>
    </div>
  )
}