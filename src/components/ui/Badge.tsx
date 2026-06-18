import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'cyan' | 'indigo' | 'violet' | 'emerald' | 'amber' | 'rose' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'bg-slate-100 text-slate-700 dark:bg-white/8 dark:text-slate-300 border border-slate-200 dark:border-white/10',
  outline:
    'bg-transparent text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-white/15',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors duration-200',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
