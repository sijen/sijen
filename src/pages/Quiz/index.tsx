import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type QuizStatus = 'loading' | 'ready' | 'error';

const QUIZ_FILE_PATH = '/quiz/cybersec_quiz_presenter.html';

export default function QuizPage() {
  const [status, setStatus] = useState<QuizStatus>('loading');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Keep quiz HTML stable
  const fetchUrl = useMemo(() => QUIZ_FILE_PATH, []);

  // NOTE: This quiz HTML relies on inline <script> and onclick="...".
  // Instead of trying to extract/rehydrate the script (which can easily break in React/Vite
  // because eval'd function scopes and inline handler bindings differ), we render the whole
  // HTML via an iframe, so the browser executes it exactly as intended.
  useEffect(() => {
    let cancelled = false;

    async function probe() {
      setStatus('loading');
      setErrorMsg('');

      try {
        const res = await fetch(fetchUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load quiz HTML (${res.status})`);
        if (cancelled) return;
        setStatus('ready');
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Unknown error';
        if (cancelled) return;
        setStatus('error');
        setErrorMsg(msg);
      }
    }

    probe();

    return () => {
      cancelled = true;
    };
  }, [fetchUrl]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 px-2 md:px-4 py-4 max-w-4xl mx-auto"
    >
      <section className="text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-xdr-info">Cybersecurity</span> Awareness Quiz
        </h1>
        <p className="text-xdr-muted">Class 8–10 • interactive quiz with instant feedback</p>
      </section>

      <section className="glassXDR rounded-2xl p-4 sm:p-6">
        {status === 'loading' && (
          <div className="text-center py-10 text-xdr-muted">Loading quiz…</div>
        )}

        {status === 'error' && (
          <div className="text-center py-10">
            <div className="text-xdr-critical font-semibold mb-2">Quiz failed to load</div>
            <div className="text-xdr-muted text-sm">{errorMsg}</div>
          </div>
        )}

        {status !== 'loading' && status !== 'error' && (
          <div className="w-full">
            <iframe
              title="Cybersecurity quiz"
              src={fetchUrl}
              className="w-full"
              style={{ border: '0', width: '100%', minHeight: '680px', color: 'white' }}
              // ensure the iframe loads a fresh copy (especially on navigation back)
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        )}
      </section>
    </motion.div>
  );
}


