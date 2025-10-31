'use client'
import React, { useState, useEffect } from 'react'

type Values = {
  min: number
  max: number
}

type RangeSliderProps = {
  min?: number
  max?: number
  step?: number
  initialMin?: number
  initialMax?: number
  displayValues?: boolean
  onChange?: (values: { min: number; max: number }) => void
  onFinalChange?: (values: { min: number; max: number }) => void
  values?: Values
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  initialMin = 20,
  initialMax = 80,
  displayValues,
  onChange,
  onFinalChange,
  values,
}: RangeSliderProps) {
  const clamp = (value: number, minValue: number, maxValue: number) =>
    Math.max(minValue, Math.min(value, maxValue))

  const clampedInitialMin = clamp(initialMin, min, max)
  const clampedInitialMax = clamp(initialMax, min, max)
  const validInitialMax =
    clampedInitialMax < clampedInitialMin ? clampedInitialMin : clampedInitialMax

  const [minVal, setMinVal] = useState(clampedInitialMin)
  const [maxVal, setMaxVal] = useState(validInitialMax)

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

  const handleInteractionEnd = () => {
    onFinalChange?.({ min: minVal, max: maxVal })
  }

  useEffect(() => {
    if (values) {
      const clampedMin = Math.max(min, Math.min(values.min, max))
      const clampedMax = Math.max(min, Math.min(values.max, max))
      const finalMax = clampedMax < clampedMin ? clampedMin : clampedMax

      setMinVal(clampedMin)
      setMaxVal(finalMax)
    }
  }, [values, min, max])

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
      <div className="relative w-full h-[0.38rem] rounded-full bg-disabled">
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
          onMouseUp={handleInteractionEnd}
          onTouchEnd={handleInteractionEnd}
          className={thumbClassName}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          onMouseUp={handleInteractionEnd}
          onTouchEnd={handleInteractionEnd}
          className={thumbClassName}
        />
      </div>

      {displayValues && (
        <div className="flex justify-between w-full mt-1 text-xs text-white">
          <span>{minVal}</span>
          <span>{maxVal}</span>
        </div>
      )}
    </div>
  )
}
