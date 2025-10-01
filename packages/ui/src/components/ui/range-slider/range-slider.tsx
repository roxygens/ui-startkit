'use client'
import React, { useState } from 'react'

type RangeSliderProps = {
  min?: number
  max?: number
  step?: number
  initialMin?: number
  initialMax?: number
  displayValues?: boolean
  onChange?: (values: { min: number; max: number }) => void
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  initialMin = 20,
  initialMax = 80,
  displayValues,
  onChange,
}: RangeSliderProps) {
  const [minVal, setMinVal] = useState(initialMin)
  const [maxVal, setMaxVal] = useState(initialMax)

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - step)
    setMinVal(value)
    onChange?.({ min: value, max: maxVal })
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + step)
    setMaxVal(value)
    onChange?.({ min: minVal, max: value })
  }

  const thumbClassName = `
    absolute w-full h-1 bg-transparent appearance-none pointer-events-none
    [&::-webkit-slider-thumb]:pointer-events-auto 
    [&::-webkit-slider-thumb]:appearance-none 
    [&::-webkit-slider-thumb]:h-3.5 
    [&::-webkit-slider-thumb]:w-3.5 
    [&::-webkit-slider-thumb]:rounded-full 
    [&::-webkit-slider-thumb]:bg-white 
    [&::-webkit-slider-thumb]:border-1 
    [&::-webkit-slider-thumb]:border-primary 
    [&::-webkit-slider-thumb]:cursor-pointer 
    [&::-moz-range-thumb]:pointer-events-auto 
    [&::-moz-range-thumb]:h-3.5 
    [&::-moz-range-thumb]:w-3.5 
    [&::-moz-range-thumb]:rounded-full 
    [&::-moz-range-thumb]:bg-white
    [&::-moz-range-thumb]:border-1 
    [&::-moz-range-thumb]:border-primary
    [&::-moz-range-thumb]:cursor-pointer
  `

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full h-[0.38rem] rounded-full bg-[var(--disabled)]">
        <div
          className="absolute h-[0.38rem] bg-primary rounded-full"
          style={{
            left: `${((minVal - min) / (max - min)) * 100}%`,
            width: `${((maxVal - minVal) / (max - min)) * 100}%`,
          }}
        ></div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className={thumbClassName}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className={thumbClassName}
        />
      </div>

      {displayValues && (
        <div className="flex justify-between w-full mt-1 text-sm text-white">
          <span>{minVal}</span>
          <span>{maxVal}</span>
        </div>
      )}
    </div>
  )
}
