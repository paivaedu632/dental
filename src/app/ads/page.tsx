import { FacebookAdCard } from "@/components/features/ads"
import { adsData } from "@/data"

export default function AdsPage() {
  // Convert single ad object to array for consistency
  const adData = Array.isArray(adsData) ? adsData : [adsData]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse ads</h1>
          <p className="text-muted-foreground mt-2">
            Discover winning products by browsing 100M+ ads from Meta, TikTok and Pinterest that perform on social platforms.
          </p>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Meta Ads Library
        </button>
        <button className="px-4 py-2 border rounded-md">TikTok</button>
        <button className="px-4 py-2 border rounded-md">Pinterest</button>
        <button className="px-4 py-2 border rounded-md">Facebook (old)</button>
      </div>

      {/* Ads Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adData.map((ad, index) => (
          <FacebookAdCard key={ad.ad_id || index} ad={ad} />
        ))}
      </div>
    </div>
  )
}
