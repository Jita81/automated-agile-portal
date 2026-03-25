import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, ExternalLink } from 'lucide-react';
import { generateAnswer, AnswerResult } from '@/ai/answer';

type Message = {
  role: 'user' | 'assistant';
  text: string;
  sources?: Array<{ title: string; url: string }>;
  noAnswer?: boolean;
};

const SUGGESTED_QUESTIONS = [
  'What problem does Automated Agile solve?',
  'What are the three primitives?',
  'How does the Three Amigos meeting work?',
  'What is the self-curation loop?',
  'How do we measure whether it\'s working?',
];

export function AskWebsiteWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAnswering]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSend = useCallback(async (question: string) => {
    if (!question.trim() || isAnswering) return;

    const userMsg: Message = { role: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsAnswering(true);

    try {
      const result: AnswerResult = await generateAnswer(question);

      const assistantMsg: Message = {
        role: 'assistant',
        text: result.answer,
        sources: result.sources,
        noAnswer: result.noAnswer,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('[AskWebsite] Answer generation failed:', err);
      // Surface the real error message from the edge function if available
      const errorText = err?.message && err.message.length < 200
        ? err.message
        : 'Sorry, something went wrong. Please try again.';
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: errorText, noAnswer: true },
      ]);
    } finally {
      setIsAnswering(false);
    }
  }, [isAnswering]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <>
      {/* FAB trigger */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-5 z-50"
          >
            <button
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2.5 bg-foreground text-background px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:gap-3"
              aria-label="Ask this website"
            >
              <MessageCircle size={15} strokeWidth={1.5} />
              <span className="font-mono text-xs tracking-wider">Ask this website</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 right-5 z-50 w-[min(420px,calc(100vw-2.5rem))] flex flex-col bg-background border border-border shadow-2xl rounded-xl overflow-hidden"
            style={{ maxHeight: 'min(600px, calc(100vh - 5rem))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <div className="flex items-center gap-2.5">
                <MessageCircle size={15} strokeWidth={1.5} className="text-foreground/70" />
                <span className="font-mono text-xs tracking-wider text-foreground">Ask this website</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-foreground/40 hover:text-foreground transition-colors" aria-label="Close">
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">

              {/* Welcome state */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Ask anything about Automated Agile. I answer only from this website's content.
                  </p>
                  <div className="space-y-2">
                    {SUGGESTED_QUESTIONS.map(q => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        disabled={isAnswering}
                        className="w-full text-left text-xs border border-border/60 px-3 py-2.5 rounded hover:bg-card transition-colors font-mono text-foreground/70 hover:text-foreground disabled:opacity-40"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.role === 'user' ? (
                    <div className="bg-foreground text-background text-xs px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="space-y-2 max-w-[95%]">
                      <div className={`text-xs leading-relaxed px-3.5 py-2.5 rounded-2xl rounded-tl-sm border ${msg.noAnswer ? 'border-border/40 text-muted-foreground bg-card/50' : 'border-border bg-card text-foreground'}`}>
                        {msg.text}
                      </div>
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="space-y-1 pl-1">
                          {msg.sources.slice(0, 3).map((s, si) => (
                            <a
                              key={si}
                              href={s.url}
                              className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <ExternalLink size={9} strokeWidth={1.5} />
                              {s.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isAnswering && (
                <div className="flex items-start">
                  <div className="bg-card border border-border px-3.5 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground inline-block"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-border shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question…"
                disabled={isAnswering}
                className="flex-1 bg-transparent text-xs outline-none text-foreground placeholder:text-muted-foreground/60 font-mono disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isAnswering}
                className="text-foreground/60 hover:text-foreground transition-colors disabled:opacity-30"
                aria-label="Send"
              >
                <Send size={13} strokeWidth={1.5} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
