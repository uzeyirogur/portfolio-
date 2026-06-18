import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  label,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-14', align === 'center' ? 'text-center' : 'text-left', className)}>
      {label && (
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-4">
          <span className="w-6 h-px bg-cyan-400" />
          {label}
          <span className="w-6 h-px bg-cyan-400" />
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
