// Custom cursor — Phase 2
// Stub: implementation begins in Phase 2 (Navigation + Cursor).

export type CursorMode = 'default' | 'hover' | 'preview' | 'grab' | 'grabbing'

export const CURSOR_LABELS: Record<CursorMode, string> = {
  default:  '',
  hover:    'VIEW',
  preview:  '',
  grab:     'GRAB',
  grabbing: 'GRABBING',
}
