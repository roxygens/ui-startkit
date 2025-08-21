type Props = {
  value: number
}

export function QualityBar(props: Props) {
  const { value } = props

  const clampedValue = Math.max(0, Math.min(1, value))

  const sections = [
    { color: '#4CB040', width: 12 },
    { color: '#67CD4B', width: 13 },
    { color: '#E0DE52', width: 40 },
    { color: '#EA9C54', width: 13 },
    { color: '#E24A4F', width: 92 },
  ]

  const totalWidth = sections.reduce((sum, section) => sum + section.width, 0)

  const percentage = sections.reduce(
    (acc, section, index, arr) => {
      const targetPixel = clampedValue * totalWidth
      const currentPixel = arr.slice(0, index).reduce((sum, s) => sum + s.width, 0)

      if (acc.found) return acc

      if (targetPixel <= currentPixel + section.width) {
        return {
          found: true,
          value: ((currentPixel + (targetPixel - currentPixel)) / totalWidth) * 100,
        }
      }

      return acc
    },
    { found: false, value: 0 },
  )?.value

  return (
    <div className={`flex items-center gap-[4px]`}>
      <span className="font-medium text-xs leading-4 text-white">{clampedValue.toFixed(3)}</span>

      <div
        className="relative h-[9px]  rounded-sm overflow-visible"
        style={{ width: `${totalWidth}px` }}
      >
        <div className="absolute inset-0 rounded-sm flex">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`h-full ${index === 0 && 'rounded-l-[8px]'} ${sections.length - 1 === index && 'rounded-r-[8px]'}`}
              style={{
                backgroundColor: section.color,
                width: `${section.width}px`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute top-[4px] flex items-start transition-all duration-500 ease-out"
          style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
        >
          <svg
            width="13"
            height="9"
            viewBox="0 0 13 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 8H1L4.80769 2.5L6 1L12 8Z" fill="white" />
            <path
              d="M5.5 1.5L4.80769 2.5M4.80769 2.5L1 8H12L6 1L4.80769 2.5Z"
              stroke="black"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
