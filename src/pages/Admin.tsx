import { useState, useEffect } from 'react';
import { Lock, LogOut, Mail, Calendar } from 'lucide-react';

const ADMIN_FUNCTION_URL =
  'https://byvofziuvbqextocljwj.supabase.co/functions/v1/admin-get-emails';

async function callAdminFunction(headers: Record<string, string>) {
  const res = await fetch(ADMIN_FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
  });
  const data = await res.json();
  return { data, error: res.ok ? null : new Error(data?.error ?? res.statusText) };
}

interface EmailEntry {
  id: string;
  email: string;
  created_at: string;
}

const SESSION_KEY = 'aa_admin_token';

const AdminLogin = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Send password once — server validates and returns a short-lived signed token
    const { data, error: fnError } = await callAdminFunction({ 'x-admin-password': password });

    if (fnError || !data?.token) {
      setError('Incorrect password.');
      setPassword('');
      setLoading(false);
      return;
    }

    // Store only the short-lived token, never the password
    sessionStorage.setItem(SESSION_KEY, data.token);
    onLogin(data.token);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <Lock size={20} strokeWidth={1.5} className="text-muted-foreground mb-6" />
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">Admin</p>
          <h1 className="font-serif text-3xl text-foreground font-normal">Access required</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-pw" className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Password
            </label>
            <input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors font-sans"
              autoFocus
              required
            />
            {error && <p className="font-mono text-xs text-destructive mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-mono text-xs tracking-widest uppercase">
              {loading ? 'Checking...' : 'Enter'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ token, onLogout }: { token: string; onLogout: () => void }) => {
  const [emails, setEmails] = useState<EmailEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error: fnError } = await callAdminFunction({ 'Authorization': `Bearer ${token}` });
      if (fnError || data?.error) {
        if (data?.error === 'Unauthorized') {
          // Token expired — force re-login
          sessionStorage.removeItem(SESSION_KEY);
          onLogout();
          return;
        }
        setError('Failed to load emails.');
      } else {
        setEmails(data?.emails ?? []);
      }
      setLoading(false);
    };
    fetchEmails();
  }, [token, onLogout]);

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">Admin</span>
            <span className="text-border">—</span>
            <span className="font-mono text-xs text-foreground/60">Download Registrations</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={13} strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-12 grid grid-cols-2 gap-px bg-border w-fit">
          <div className="bg-background px-8 py-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Total registrations</p>
            <p className="font-serif text-4xl text-foreground font-normal">{loading ? '—' : emails.length}</p>
          </div>
          <div className="bg-background px-8 py-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Latest</p>
            <p className="font-serif text-lg text-foreground font-normal">
              {loading || emails.length === 0 ? '—' : formatDate(emails[0].created_at)}
            </p>
          </div>
        </div>

        {loading ? (
          <p className="font-mono text-xs text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="font-mono text-xs text-destructive">{error}</p>
        ) : emails.length === 0 ? (
          <p className="font-mono text-xs text-muted-foreground">No registrations yet.</p>
        ) : (
          <div className="border-t border-border">
            <div className="grid grid-cols-[1fr_auto] gap-6 py-3 border-b border-border">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Mail size={11} strokeWidth={1.5} />
                Email
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Calendar size={11} strokeWidth={1.5} />
                Registered
              </p>
            </div>
            {emails.map((entry) => (
              <div
                key={entry.id}
                className="grid grid-cols-[1fr_auto] gap-6 py-4 border-b border-border/40 last:border-0 hover:bg-card/50 transition-colors -mx-2 px-2"
              >
                <span className="text-sm text-foreground font-sans truncate">{entry.email}</span>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{formatDate(entry.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Admin = () => {
  const [token, setToken] = useState<string | null>(
    () => sessionStorage.getItem(SESSION_KEY)
  );

  const handleLogin = (t: string) => setToken(t);
  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setToken(null);
  };

  if (!token) return <AdminLogin onLogin={handleLogin} />;
  return <AdminDashboard token={token} onLogout={handleLogout} />;
};

export default Admin;
