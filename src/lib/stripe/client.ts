import Stripe from "stripe";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET) {
  throw new Error("Missing STRIPE_SECRET_KEY env var");
}

export const stripe = new Stripe(STRIPE_SECRET, {
  apiVersion: "2024-06-20",
});

type CheckoutMetadata = Record<string, string | number | boolean | null>;

function appendSessionId(url: string) {
  const hasQuery = url.includes("?");
  const delimiter = hasQuery ? "&" : "?";
  return `${url}${delimiter}session_id={CHECKOUT_SESSION_ID}`;
}

export async function createCheckoutSession(
  amountCents: number,
  description: string,
  metadata: CheckoutMetadata = {},
  successUrl: string,
  cancelUrl: string
) {
  return await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_creation: "always",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: description },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    success_url: appendSessionId(successUrl),
    cancel_url: cancelUrl,
    metadata: Object.fromEntries(
      Object.entries(metadata).map(([k, v]) => [k, v === null ? "" : String(v)])
    ),
  });
}

export async function createCustomer(
  email: string,
  name?: string,
  metadata: CheckoutMetadata = {}
) {
  return await stripe.customers.create({
    email,
    name,
    metadata: Object.fromEntries(
      Object.entries(metadata).map(([k, v]) => [k, v === null ? "" : String(v)])
    ),
  });
}

type InvoiceItem = {
  price?: string;
  amount?: number; // in cents
  currency?: string;
  description?: string;
  quantity?: number;
};

export async function createInvoice(
  customerId: string,
  items: InvoiceItem[]
) {
  const invoice = await stripe.invoices.create({ customer: customerId });

  for (const item of items) {
    if (item.price) {
      await stripe.invoiceItems.create({
        customer: customerId,
        price: item.price,
        invoice: invoice.id,
        quantity: item.quantity ?? 1,
      });
    } else if (item.amount && item.currency) {
      await stripe.invoiceItems.create({
        customer: customerId,
        amount: item.amount,
        currency: item.currency,
        description: item.description,
        invoice: invoice.id,
        quantity: item.quantity ?? 1,
      });
    }
  }

  return await stripe.invoices.finalizeInvoice(invoice.id);
}

export async function retrieveSession(sessionId: string) {
  return await stripe.checkout.sessions.retrieve(sessionId);
}