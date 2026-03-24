# Automated Agile — Website

The marketing and information website for [Automated Agile](https://automatedagile.co.uk), built on Vite + React + TypeScript + Tailwind CSS, hosted on [Lovable](https://lovable.dev), with backend functions running on [Supabase](https://supabase.com).

---

## "Ask this Website" Chat Widget

The site includes a conversational AI chat widget that lets visitors ask questions about Automated Agile and receive grounded answers from the site's content.

**How it works:**
- Visitor clicks "Ask this website" → types a question
- A Supabase Edge Function (`ask-website`) receives the question
- The function loads the full site content index (`/public/ai/index/chunks.json`)
- It sends everything to **Groq's Llama 3.3 70B** — a free, fast, high-quality LLM
- The model answers strictly from the site's content and returns source references
- Rate limiting is enforced (20 questions per IP per 15 minutes)

**Why Groq?** The free tier provides 30 requests/minute with no credit card required. Llama 3.3 70B produces high-quality, instruction-following answers. Total cost at scale: ~$0.001 per question.

---

## To Activate the Chat Widget

The frontend code is complete and enabled. You need to complete three backend steps.

### Step 1 — Get a free Groq API key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (free, no credit card required)
3. Navigate to **API Keys** → **Create API Key**
4. Copy the key (it starts with `gsk_`)

### Step 2 — Install the Supabase CLI (if not already installed)

```bash
brew install supabase/tap/supabase
```

Then link your project (you only need to do this once):

```bash
supabase link --project-ref byvofziuvbqextocljwj
```

You'll be prompted for your Supabase database password. Find it in your [Supabase dashboard](https://supabase.com/dashboard/project/byvofziuvbqextocljwj/settings/database) under **Settings → Database → Database password**.

### Step 3 — Set the secret and deploy

Run these three commands in the repo root:

```bash
# 1. Store your Groq API key as a secure Supabase secret
supabase secrets set GROQ_API_KEY=gsk_your_key_here

# 2. Create the rate-limiting table in the database
supabase db push

# 3. Deploy the Edge Function
supabase functions deploy ask-website
```

That's it. The widget will be live immediately on the hosted site.

---

## Verifying It Works

After deployment, you can test the Edge Function directly:

```bash
curl -X POST https://byvofziuvbqextocljwj.supabase.co/functions/v1/ask-website \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5dm9meml1dmJxZXh0b2NsandqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NDcyNzcsImV4cCI6MjA4OTAyMzI3N30.RNhSbnbhirbwkj8AqvzOGTgpT1g4M8RdhUKpCUstwWM" \
  -d '{"question": "What are the three primitives?"}'
```

You should get a JSON response with `answer`, `sources`, and `noAnswer` fields.

---

## Local Development

```bash
# Install dependencies
npm install

# Start the dev server (available at http://localhost:8080)
npm run dev
```

To test the chat widget locally against the live Edge Function, the dev server at `localhost:8080` is included in the Edge Function's allowed origins. No extra config needed — the Supabase client picks up the URL and anon key from `.env` automatically.

If you want to run the Edge Function locally too:

```bash
supabase start              # starts local Supabase stack
supabase functions serve    # serves all functions on localhost
```

Then set `GROQ_API_KEY` in `supabase/.env.local`:

```
GROQ_API_KEY=gsk_your_key_here
```

---

## Project Structure

```
├── public/
│   └── ai/index/chunks.json     # Pre-built site content index (14 sections)
├── src/
│   ├── ai/
│   │   └── answer.ts            # Client: calls the Edge Function
│   ├── components/
│   │   ├── AskWebsiteWidget.tsx # Chat UI widget
│   │   └── ...                  # Other page sections
│   ├── integrations/supabase/   # Supabase client config
│   └── pages/Index.tsx          # Main page (widget rendered here)
└── supabase/
    ├── functions/
    │   ├── ask-website/         # AI chat Edge Function (Groq + Llama 3.3 70B)
    │   ├── submit-email/        # Download CTA email capture
    │   └── admin-get-emails/    # Admin: retrieve captured emails
    └── migrations/              # Database schema migrations
```

---

## Updating the Content Index

The chat widget answers from `public/ai/index/chunks.json`. If you update the website's content, regenerate this file to keep the AI's answers accurate.

Each entry in the file follows this shape:

```json
{
  "id": "unique-id",
  "url": "/#section-anchor",
  "page_title": "Section Title",
  "section_heading": "Sub-heading",
  "text": "Full text content of the section..."
}
```

Edit the file directly to add, update, or remove sections. The Edge Function fetches the live version from the hosted site (`/ai/index/chunks.json`) on each cold start, so changes deploy automatically with the next Lovable publish.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vite, React 18, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Animation | Framer Motion |
| Backend functions | Supabase Edge Functions (Deno) |
| Database | Supabase (PostgreSQL) |
| AI model | Groq — Llama 3.3 70B Versatile |
| Hosting | Lovable |

---

## Deploying Changes

Changes pushed to `main` are automatically picked up by Lovable and deployed to the hosted site. Push to this branch (`feature/ask-website-chat`) and merge via a pull request when ready.

For Edge Function changes, redeploy manually after merging:

```bash
supabase functions deploy ask-website
```
