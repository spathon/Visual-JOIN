import { useI18n } from './i18n'

const width = 112.5
const height = 75
const centerY = height / 2
const margin = 1 // for stroke
const centerX1 = 37.5 // 1/3 of width
const centerX2 = 75 // 2/3 of width
const radius = Math.min(centerX1, height / 2) - margin // maximize radius to fill viewBox
const fillColor = 'var(--svg-fill)'
const strokeColorLeft = 'var(--svg-stroke-left)'
const strokeColorRight = 'var(--svg-stroke-right)'
const strokeWidth = 1.5

// Simple Venn-style SVGs for JOIN types
export const InnerJoinSVG = () => {
  const { t } = useI18n()
  // Fill only the intersection using SVG mask, always red
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <title>{t.innerJoinTitle}</title>
      <defs>
        <clipPath id="clip1">
          <circle cx={centerX1} cy={centerY} r={radius} />
        </clipPath>
        <clipPath id="clip2">
          <circle cx={centerX2} cy={centerY} r={radius} />
        </clipPath>
      </defs>
      <g clipPath="url(#clip1)">
        <circle cx={centerX2} cy={centerY} r={radius} fill={fillColor} />
      </g>
      <g clipPath="url(#clip2)">
        <circle cx={centerX1} cy={centerY} r={radius} fill={fillColor} />
      </g>
      {/* Borders always on top */}
      <circle
        cx={centerX1}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorLeft}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={centerX2}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorRight}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export const LeftJoinSVG = () => {
  const { t } = useI18n()
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <title>{t.leftJoinTitle}</title>
      <circle cx={centerX1} cy={centerY} r={radius} fill={fillColor} />
      {/* Borders always on top */}
      <circle
        cx={centerX1}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorLeft}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={centerX2}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorRight}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export const RightJoinSVG = () => {
  const { t } = useI18n()
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <title>{t.rightJoinTitle}</title>
      <circle cx={centerX2} cy={centerY} r={radius} fill={fillColor} />
      {/* Borders always on top */}
      <circle
        cx={centerX1}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorLeft}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={centerX2}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorRight}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export const OuterJoinSVG = () => {
  const { t } = useI18n()
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <title>{t.outerJoinTitle}</title>
      <circle cx={centerX1} cy={centerY} r={radius} fill={fillColor} />
      <circle cx={centerX2} cy={centerY} r={radius} fill={fillColor} />
      {/* Borders always on top */}
      <circle
        cx={centerX1}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorLeft}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={centerX2}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorRight}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export const LeftAntiJoinSVG = () => {
  const { t } = useI18n()
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <title>{t.leftAntiJoinTitle}</title>
      <defs>
        <mask id="leftAntiMask">
          <rect width={width} height={height} fill="white" />
          <circle cx={centerX2} cy={centerY} r={radius} fill="black" />
        </mask>
      </defs>
      <circle
        cx={centerX1}
        cy={centerY}
        r={radius}
        fill={fillColor}
        mask="url(#leftAntiMask)"
      />
      <circle
        cx={centerX1}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorLeft}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={centerX2}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={strokeColorRight}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
