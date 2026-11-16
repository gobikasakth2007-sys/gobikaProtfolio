import { RotateCcw } from 'lucide-react';

interface FooterProps {
  name: string;
  onResetPortfolio: () => void;
}

export function Footer({ name, onResetPortfolio }: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#07080D] py-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>
          © {new Date().getFullYear()} {name} <span aria-hidden="true" className="mx-1.5">·</span> Software &amp; Computer Science Portfolio
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <a href="#home" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </a>
          <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Projects
          </a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Contact
          </a>
          <button
            type="button"
            onClick={onResetPortfolio}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            title="Restore default portfolio placeholders"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Edits</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
