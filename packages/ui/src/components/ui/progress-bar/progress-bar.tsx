import React from 'react'
import { cn } from '@/lib/utils'

export type ProgressBarProps = {
  value: number
  showPercentage?: 'left' | 'right' | 'bottom-left' | 'bottom-right' | 'none'
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, showPercentage }) => {
  const percentage = `${Math.min(Math.max(value, 0), 100)}%`
  return (
    <div
      className={cn('flex w-full relative', {
        'flex-row items-center': showPercentage === 'left' || showPercentage === 'right',
        'flex-col': showPercentage === 'bottom-left' || showPercentage === 'bottom-right',
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
          className={'h-full transition-[width] duration-300 ease-in-out rounded bg-primary'}
          style={{
            borderRadius: '0.5rem',
            width: percentage,
          }}
        />
      </div>

      {['bottom-left', 'bottom-right'].includes(showPercentage as 'none') && (
        <p
          className="absolute text-xs text-white"
          style={{
            marginTop: '0.75rem',
            right: showPercentage === 'bottom-right' ? 0 : undefined,
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
