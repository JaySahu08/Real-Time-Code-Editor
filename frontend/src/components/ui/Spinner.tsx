import './Spinner.css'

export function Spinner({ fullscreen = false }: { fullscreen?: boolean }) {
  return (
    <div className={fullscreen ? 'spinner-wrap spinner-fullscreen' : 'spinner-wrap'}>
      <div className="spinner" />
    </div>
  )
}
