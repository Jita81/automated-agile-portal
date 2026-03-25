import { supabase } from '@/integrations/supabase/client';

export interface AnswerResult {
  answer: string;
  sources: Array<{ title: string; url: string }>;
  noAnswer: boolean;
}

export async function generateAnswer(question: string): Promise<AnswerResult> {
  const { data, error } = await supabase.functions.invoke('ask-website', {
    body: { question },
  });

  if (error) {
    console.error('[AskWebsite] Edge function error:', error);
    throw new Error(error.message ?? 'Failed to get answer');
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return {
    answer: data.answer ?? "I can't find that on this website.",
    sources: data.sources ?? [],
    noAnswer: data.noAnswer ?? true,
  };
}
