import './Alert.css'

type Variant = 'error' | 'success' | 'info'

export function Alert({ variant = 'error', children }: { variant?: Variant; children: React.ReactNode }) {
  return <div className={`alert alert-${variant}`}>{children}</div>
}
