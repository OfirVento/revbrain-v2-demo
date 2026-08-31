import { useRef, useState, useCallback } from 'react';
import { Image, Copy, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import { clsx } from 'clsx';
// §5.2 — Chart cards are deliverable assets:
// Title + chart + one-sentence takeaway, self-contained.
// Copy-as-image: captures the card DOM node as PNG.
// Copy-explanation: copies the takeaway text to clipboard.

interface ChartCardProps {
  title: string;
  takeaway: string;
  children: React.ReactNode;
  id?: string;
}

export function ChartCard({ title, takeaway, children, id }: ChartCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copyingImage, setCopyingImage] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyImage = useCallback(async () => {
    if (!cardRef.current || copyingImage) return;
    setCopyingImage(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: 'white',
        pixelRatio: 2,
        // Exclude the action buttons from the capture
        filter: (node) => !node.classList?.contains('chart-card-actions'),
      });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    } catch {
      // Fallback: trigger download
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: 'white',
        pixelRatio: 2,
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.png`;
      a.click();
    } finally {
      setCopyingImage(false);
    }
  }, [copyingImage, title]);

  const handleCopyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${takeaway}`);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }, [title, takeaway]);

  return (
    <div id={id} className="card group relative" ref={cardRef}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        {/* Action buttons — excluded from image capture */}
        <div className="chart-card-actions flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopyImage}
            disabled={copyingImage}
            className={clsx(
              'flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors',
              copyingImage
                ? 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] cursor-wait'
                : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--accent))]/50 hover:text-[hsl(var(--accent))]'
            )}
            title="Copy card as image"
          >
            {copiedImage ? <Check className="w-3 h-3 text-green-500" /> : <Image className="w-3 h-3" />}
            <span className="hidden sm:inline">{copiedImage ? 'Copied!' : 'Image'}</span>
          </button>
          <button
            onClick={handleCopyText}
            className={clsx(
              'flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors',
              'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--accent))]/50 hover:text-[hsl(var(--accent))]'
            )}
            title="Copy explanation text"
          >
            {copiedText ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            <span className="hidden sm:inline">{copiedText ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Chart area */}
      <div className="mb-4">{children}</div>

      {/* Takeaway — self-contained summary for screenshot use */}
      <div className="pt-3 border-t border-[hsl(var(--border))]">
        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
          <span className="font-semibold text-[hsl(var(--foreground))]">Takeaway: </span>
          {takeaway}
        </p>
      </div>
    </div>
  );
}
