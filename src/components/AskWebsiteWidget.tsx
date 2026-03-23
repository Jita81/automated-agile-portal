import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, ExternalLink, AlertCircle, Zap, ZapOff } from 'lucide-react';
import { checkCapability } from '@/ai/capability';
import { prepareIndex } from '@/ai/retrieve';
import { retrieveTopK } from '@/ai/retrieve';
import { generateAnswer, AnswerResult } from '@/ai/answer';
import { Chunk } from '@/ai/loadIndex';

// ─── Types ──────────────────────────────────────────────────────────────────

type WidgetState =
  | 'checking'       // performing capability check
  | 'unsupported'    // WebGPU not available
  | 'idle'           // ready to enable
  | 'loading-model'  // downloading / loading model + index
  | 'ready'          // ready to answer questions
  | 'slow-warning';  // capable but software GPU detected

type Message = {
  role: 'user' | 'assistant';
  text: string;
  sources?: Array<{ title: string; url: string }>;
  noAnswer?: boolean;
};

// ─── Suggested questions ────────────────────────────────────────────────────

const SUGGESTED_QUESTIONS = [
  'What are the three primitives?',
  'What is Decision 7?',
  'How does the Three Amigos meeting work?',
  'What is the self-curation loop?',
  'What integrations does the platform support?',
];

// ─── Component ──────────────────────────────────────────────────────────────

export function AskWebsiteWidget() {
  const [open, setOpen] = useState(false);
  const [widgetState, setWidgetState] = useState<WidgetState>('checking');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [loadProgress, setLoadProgress] = useState<string>('');
  const [capabilityTier, setCapabilityTier] = useState<'fast' | 'slow' | null>(null);

  const indexRef = useRef<(Chunk & { score?: number })[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Capability check on mount ──────────────────────────────────────────
  useEffect(() => {
    checkCapability().then(result => {
      if (!result.ok) {
        setWidgetState('unsupported');
      } else {
        setCapabilityTier(result.tier);
        setWidgetState(result.tier === 'slow' ? 'slow-warning' : 'idle');
      }
    });
  }, []);

  // ── Auto-scroll to latest message ─────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAnswering]);

  // ── Focus input when chat opens ────────────────────────────────────────
  useEffect(() => {
    if (open && widgetState === 'ready') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, widgetState]);

  // ── Load model + index ─────────────────────────────────────────────────
  const handleEnable = useCallback(async () => {
    setWidgetState('loading-model');
    setOpen(true);

    try {
      const onProgress = (p: any) => {
        if (p?.file) {
          setLoadProgress(`Loading ${p.file.split('/').pop() ?? 'model'}…`);
        } else if (p?.status === 'progress' && p?.progress != null) {
          setLoadProgress(`Downloading model: ${Math.round(p.progress)}%`);
        }
      };

      const chunks = await prepareIndex(onProgress);
      indexRef.current = chunks;
      setLoadProgress('');
      setWidgetState('ready');
    } catch (err) {
      console.error('[AskWebsite] Failed to load model/index:', err);
      setWidgetState('idle'); // fall back gracefully
    }
  }, []);

  // ── Send message ───────────────────────────────────────────────────────
  const handleSend = useCallback(async (question: string) => {
    if (!question.trim() || isAnswering || !indexRef.current) return;

    const userMsg: Message = { role: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsAnswering(true);

    try {
      const topChunks = await retrieveTopK(question, indexRef.current as any, 6);
      const result: AnswerResult = await generateAnswer(question, topChunks as any);

      const assistantMsg: Message = {
        role: 'assistant',
        text: result.answer,
        sources: result.sources,
        noAnswer: result.noAnswer,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('[AskWebsite] Answer generation failed:', err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'Sorry, something went wrong. Please try again.', noAnswer: true },
      ]);
    } finally {
      setIsAnswering(false);
    }
  }, [isAnswering]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  // ─── Render ─────────────────────────────────────────────────────────────

  // Don't render button until capability check done
  if (widgetState === 'checking') return null;

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
              onClick={() => widgetState === 'idle' || widgetState === 'slow-warning' ? handleEnable() : setOpen(true)}
              className="group flex items-center gap-2.5 bg-foreground text-background px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:gap-3"
              aria-label="Ask this website"
            >
              <MessageCircle size={15} strokeWidth={1.5} />
              <span className="font-mono text-xs tracking-wider">Ask this website</span>
              {widgetState === 'unsupported' && (
                <ZapOff size={12} className="opacity-50" />
              )}
              {(widgetState === 'idle' || widgetState === 'slow-warning') && (
                <Zap size={12} className="opacity-60" />
              )}
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
              <div className="flex items-center gap-3">
                {widgetState === 'ready' && (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-foreground/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 inline-block" />
                    Runs locally
                  </span>
                )}
                <button onClick={() => setOpen(false)} className="text-foreground/40 hover:text-foreground transition-colors" aria-label="Close">
                  <X size={15} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">

              {/* ── State: loading model ── */}
              {widgetState === 'loading-model' && (
                <div className="flex flex-col items-center justify-center h-40 gap-4 text-center">
                  <Loader2 size={22} className="animate-spin text-foreground/40" strokeWidth={1.5} />
                  <div>
                    <p className="font-mono text-xs text-foreground/60 mb-1">
                      {loadProgress || 'Preparing local AI…'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      The model runs entirely in your browser.<br />
                      This may take a moment on first load.
                    </p>
                  </div>
                </div>
              )}

              {/* ── State: unsupported ── */}
              {widgetState === 'unsupported' && (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <AlertCircle size={22} strokeWidth={1.5} className="text-muted-foreground" />
                  <p className="font-mono text-xs text-muted-foreground">
                    Local AI isn't available on this browser or device.
                  </p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    WebGPU is required. Try a recent version of Chrome or Edge on desktop.
                  </p>
                </div>
              )}

              {/* ── State: slow warning ── */}
              {widgetState === 'slow-warning' && (
                <div className="flex flex-col gap-4 py-6 text-center items-center">
                  <AlertCircle size={22} strokeWidth={1.5} className="text-foreground/50" />
                  <p className="font-mono text-xs text-foreground/70">Your device can run local AI, but responses may be slow.</p>
                  <button
                    onClick={handleEnable}
                    className="font-mono text-xs border border-border px-4 py-2 hover:bg-card transition-colors rounded"
                  >
                    Enable anyway
                  </button>
                </div>
              )}

              {/* ── State: ready — show messages or welcome ── */}
              {widgetState === 'ready' && messages.length === 0 && (
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

              {widgetState === 'ready' && messages.map((msg, i) => (
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
            {widgetState === 'ready' && (
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
