import { clsx, type ClassValue } from "clsx"
import { format as formatDateFns, parseISO, isValid } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}

export function formatDate(value: Date | string | number, pattern: string = 'PPP') {
  const date = typeof value === 'string' ? parseISO(value) : new Date(value)
  return isValid(date) ? formatDateFns(date, pattern) : ''
}

export function formatPhoneNumber(input: string) {
  const digits = (input || '').replace(/\D/g, '')
  if (digits.length === 10) {
    const [a, b, c, d, e, f, g, h, i, j] = digits.split('')
    return `(${a}${b}${c}) ${d}${e}${f}-${g}${h}${i}${j}`
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    const rest = digits.slice(1)
    const [a, b, c, d, e, f, g, h, i, j] = rest.split('')
    return `+1 (${a}${b}${c}) ${d}${e}${f}-${g}${h}${i}${j}`
  }
  return input
}

export function generateSecureToken(length: number = 32) {
  if (typeof globalThis.crypto !== 'undefined') {
    if (typeof (globalThis.crypto as any).randomUUID === 'function' && length >= 36) {
      return (globalThis.crypto as any).randomUUID()
    }
    const array = new Uint8Array(length)
    globalThis.crypto.getRandomValues(array)
    return Array.from(array).map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  try {
    // Node.js fallback
    const nodeCrypto = require('crypto') as typeof import('crypto')
    return nodeCrypto.randomBytes(Math.max(16, Math.ceil(length / 2))).toString('hex').slice(0, length)
  } catch {
    // Non-crypto fallback
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  }
}

export async function hashSHA256(input: string): Promise<string> {
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.subtle) {
    const data = new TextEncoder().encode(input)
    const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  try {
    const { createHash } = await import('crypto')
    return createHash('sha256').update(input).digest('hex')
  } catch {
    return ''
  }
}

// Server-only utilities have been moved to src/lib/server-utils.ts to avoid client bundling
