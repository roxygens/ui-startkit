type Props = {
  isOpen: boolean
  text?: string
}

export function Loader({ isOpen, text }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 border-[0.75rem] border-neutral-100" />

          <div className="absolute left-0 top-0 size-3 animate-travel-square bg-primary" />
        </div>

        {text && <p className="animate-pulse-text text-sm text-white">{text}</p>}
      </div>
    </div>
  )
}
