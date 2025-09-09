import React from 'react'
import { cn } from '@/lib/utils'

export type ProgressBarProps = {
  value: number
  showPercentage?: 'left' | 'right' | 'bottom' | 'none'
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, showPercentage }) => {
  const percentage = `${Math.min(Math.max(value, 0), 100)}%`
  return (
    <div
      className={cn('flex w-full relative', {
        'flex-row items-center': showPercentage === 'left' || showPercentage === 'right',
        'flex-col': showPercentage === 'bottom',
      })}
    >
      {showPercentage === 'left' && (
        <p className="text-xs text-white" style={{ marginRight: '0.75rem' }}>
          {percentage}
        </p>
      )}

      <div
        style={{
          width: '100%',
          height: '0.5rem',
          backgroundColor: '#474C56',
          borderRadius: '0.5rem',
          overflow: 'hidden',
        }}
      >
        <div
          role="progressbar"
          className={'h-full rounded bg-primary'}
          style={{
            borderRadius: '0.5rem',
            width: percentage,
          }}
        />
      </div>

      {showPercentage === 'bottom' && (
        <p
          className="absolute text-xs text-white"
          style={{
            marginTop: '0.75rem',
            left: percentage,
            transform: `translateX(-${percentage})`,
          }}
        >
          {percentage}
        </p>
      )}

      {showPercentage === 'right' && (
        <p className="text-xs text-white" style={{ marginLeft: '0.75rem' }}>
          {percentage}
        </p>
      )}
    </div>
  )
}
