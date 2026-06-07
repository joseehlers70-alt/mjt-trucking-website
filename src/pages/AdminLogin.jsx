import { LockKeyhole, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '../lib/supabase.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin', { replace: true });
    });
  }, [navigate]);

  const signIn = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    if (!isSupabaseConfigured) {
      setError('Connect Supabase environment variables before using the admin area.');
      setSubmitting(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <main className="admin-login-page">
      <form className="admin-login-panel" onSubmit={signIn}>
        <img src="/images/mjt-trucking-logo-transparent-hd.png" alt="MJT Trucking" />
        <div className="admin-login-icon"><LockKeyhole size={25} /></div>
        <h1>Inventory Admin</h1>
        <p>Sign in to manage truck and trailer listings.</p>
        <label>
          <span>Email address</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error && <div className="form-error">{error}</div>}
        <button className="button button-primary" type="submit" disabled={submitting}>
          <LogIn size={18} /> {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
