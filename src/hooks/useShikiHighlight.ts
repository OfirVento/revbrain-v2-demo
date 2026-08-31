// Shiki highlighter singleton — lazy-loaded once, reused across all code panes.
// Using shiki/bundle/web with explicit lang list to avoid pulling in all 200+
// language grammars (which would balloon the bundle).
import { useState, useEffect } from 'react';

type Highlighter = Awaited<ReturnType<typeof import('shiki').createHighlighter>>;

let _promise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!_promise) {
    _promise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: ['github-dark', 'github-light'],
        // Explicit list — only langs present in the payload
        langs: ['javascript', 'apex', 'json'],
      })
    );
  }
  return _promise;
}


const LANG_MAP: Record<string, string> = {
  QCP_JavaScript: 'javascript',
  Apex_Class: 'apex',
  Apex_Trigger: 'apex',
  apex: 'apex',
  javascript: 'javascript',
  json: 'json',
  cml: 'javascript', // closest approximation
  pseudocode: 'javascript',
};

export function useShikiHighlight(
  code: string,
  lang: string,
  theme: 'github-dark' | 'github-light' = 'github-dark'
) {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getHighlighter().then((hl) => {
      if (cancelled) return;
      const safeLang = LANG_MAP[lang] ?? 'javascript';
      try {
        setHtml(hl.codeToHtml(code, { lang: safeLang, theme }));
      } catch {
        setHtml(`<pre><code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [code, lang, theme]);

  return { html, loading };
}
