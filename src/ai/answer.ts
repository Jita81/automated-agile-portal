const FUNCTION_URL =
  'https://ekxzgequqnbhmvcrgiqd.supabase.co/functions/v1/ask-website';

export interface AnswerResult {
  answer: string;
  sources: Array<{ title: string; url: string }>;
  noAnswer: boolean;
}

export async function generateAnswer(question: string): Promise<AnswerResult> {
  const res = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  const data = await res.json();

  if (!res.ok || data?.error) {
    const msg = data?.error ?? `Request failed (${res.status})`;
    console.error('[AskWebsite] Edge function error:', msg);
    throw new Error(msg);
  }

  return {
    answer: data.answer ?? "I can't find that on this website.",
    sources: data.sources ?? [],
    noAnswer: data.noAnswer ?? true,
  };
}
