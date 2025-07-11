const width = 112.5;
const height = 75;
const centerY = height / 2;
const margin = 1; // for stroke
const centerX1 = 37.5; // 1/3 of width
const centerX2 = 75;   // 2/3 of width
const radius = Math.min(centerX1, height / 2) - margin; // maximize radius to fill viewBox
const fillColor = '#CC333F';
const strokeColorLeft = '#00A0B0';
const strokeColorRight = '#EB6841';
const strokeWidth = 1.5;

// Simple Venn-style SVGs for JOIN types
export const InnerJoinSVG = () => {
  // Fill only the intersection using SVG mask, always red
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
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
      <circle cx={centerX1} cy={centerY} r={radius} fill="none" stroke={strokeColorLeft} strokeWidth={strokeWidth} />
      <circle cx={centerX2} cy={centerY} r={radius} fill="none" stroke={strokeColorRight} strokeWidth={strokeWidth} />
    </svg>
  );
}

export const LeftJoinSVG = () => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <circle cx={centerX1} cy={centerY} r={radius} fill={fillColor} />
      {/* Borders always on top */}
      <circle cx={centerX1} cy={centerY} r={radius} fill="none" stroke={strokeColorLeft} strokeWidth={strokeWidth} />
      <circle cx={centerX2} cy={centerY} r={radius} fill="none" stroke={strokeColorRight} strokeWidth={strokeWidth} />
    </svg>
  );
}

export const RightJoinSVG = () => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <circle cx={centerX2} cy={centerY} r={radius} fill={fillColor} />
      {/* Borders always on top */}
      <circle cx={centerX1} cy={centerY} r={radius} fill="none" stroke={strokeColorLeft} strokeWidth={strokeWidth} />
      <circle cx={centerX2} cy={centerY} r={radius} fill="none" stroke={strokeColorRight} strokeWidth={strokeWidth} />
    </svg>
  );
}

export const OuterJoinSVG = () => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <circle cx={centerX1} cy={centerY} r={radius} fill={fillColor} />
      <circle cx={centerX2} cy={centerY} r={radius} fill={fillColor} />
      {/* Borders always on top */}
      <circle cx={centerX1} cy={centerY} r={radius} fill="none" stroke={strokeColorLeft} strokeWidth={strokeWidth} />
      <circle cx={centerX2} cy={centerY} r={radius} fill="none" stroke={strokeColorRight} strokeWidth={strokeWidth} />
    </svg>
  );
}
