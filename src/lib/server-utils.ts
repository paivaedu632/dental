import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function getRegionalPixel(region: string): Promise<string | null> {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('regional_pixels')
      .select('pixel_id')
      .eq('region', region)
      .single()
    if (error) return null
    return (data as any)?.pixel_id ?? null
  } catch {
    return null
  }
}

export async function calculateTrialBudgetAvailable(dentistId: string): Promise<number> {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('dentists')
      .select('trial_budget_initial, trial_budget_spent')
      .eq('id', dentistId)
      .single()
    if (error) return 0
    const initial = Number((data as any)?.trial_budget_initial ?? 0)
    const spent = Number((data as any)?.trial_budget_spent ?? 0)
    const remaining = Math.max(0, initial - spent)
    return Number.isFinite(remaining) ? remaining : 0
  } catch {
    return 0
  }
}