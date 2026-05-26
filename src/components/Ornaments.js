import { Box } from '@mui/material';
import { palette } from '@/theme/theme';

export function Divider({ width = 220, color = palette.gold, sx }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 3,
        ...sx
      }}
    >
      <svg width={width} height="20" viewBox="0 0 220 20" fill="none" aria-hidden>
        <path
          d="M0 10 L90 10"
          stroke={color}
          strokeWidth="0.6"
          strokeOpacity="0.7"
        />
        <path
          d="M130 10 L220 10"
          stroke={color}
          strokeWidth="0.6"
          strokeOpacity="0.7"
        />
        <g transform="translate(110 10)">
          <circle r="6" fill="none" stroke={color} strokeWidth="0.8" />
          <circle r="2.2" fill={color} fillOpacity="0.9" />
          <path
            d="M-14 0 L-9 -3 L-9 3 Z"
            fill={color}
            fillOpacity="0.6"
          />
          <path
            d="M14 0 L9 -3 L9 3 Z"
            fill={color}
            fillOpacity="0.6"
          />
        </g>
      </svg>
    </Box>
  );
}

export function ArchFrame({ children, sx }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3/4',
        borderTopLeftRadius: '50% 22%',
        borderTopRightRadius: '50% 22%',
        overflow: 'hidden',
        boxShadow: `0 30px 80px -30px ${palette.warmGray}55`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 8,
          borderTopLeftRadius: '50% 22%',
          borderTopRightRadius: '50% 22%',
          border: `1px solid ${palette.gold}`,
          opacity: 0.55,
          pointerEvents: 'none',
          zIndex: 2
        },
        ...sx
      }}
    >
      {children}
    </Box>
  );
}

export function CornerOrnament({ position = 'top-left', size = 140, opacity = 0.5 }) {
  const transforms = {
    'top-left': 'rotate(0deg)',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1, -1)'
  };
  const styleByPos = {
    'top-left': { top: 16, left: 16 },
    'top-right': { top: 16, right: 16 },
    'bottom-left': { bottom: 16, left: 16 },
    'bottom-right': { bottom: 16, right: 16 }
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        ...styleByPos[position],
        width: size,
        height: size,
        opacity,
        pointerEvents: 'none',
        transform: transforms[position]
      }}
      aria-hidden
    >
      <svg viewBox="0 0 140 140" width="100%" height="100%" fill="none">
        <g stroke={palette.gold} strokeWidth="0.7" fill="none">
          <path d="M2 60 Q2 2 60 2" />
          <path d="M14 60 Q14 14 60 14" />
          <path d="M2 60 L14 60" />
          <path d="M60 2 L60 14" />
          <circle cx="34" cy="34" r="14" />
          <circle cx="34" cy="34" r="6" />
          <path d="M34 16 L34 20 M34 48 L34 52 M16 34 L20 34 M48 34 L52 34" />
          <path d="M22 22 L26 26 M42 42 L46 46 M22 46 L26 42 M42 26 L46 22" strokeOpacity="0.7" />
          <path d="M14 80 Q40 80 40 110" strokeOpacity="0.6" />
          <path d="M80 14 Q80 40 110 40" strokeOpacity="0.6" />
        </g>
      </svg>
    </Box>
  );
}

export function MosqueSilhouette({ sx, opacity = 0.06 }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 900,
        opacity,
        pointerEvents: 'none',
        ...sx
      }}
      aria-hidden
    >
      <svg viewBox="0 0 900 220" width="100%" height="100%" fill="none">
        <g fill={palette.softBrown}>
          <path d="M0 220 L0 180 L90 180 L90 130 Q120 100 150 130 L150 180 L240 180 L240 90 Q300 30 360 90 L360 180 L420 180 L420 110 Q450 80 480 110 L480 180 L540 180 L540 90 Q600 30 660 90 L660 180 L750 180 L750 130 Q780 100 810 130 L810 180 L900 180 L900 220 Z" />
        </g>
        <g fill="none" stroke={palette.softBrown} strokeWidth="1">
          <line x1="135" y1="80" x2="135" y2="120" />
          <line x1="330" y1="20" x2="330" y2="80" />
          <line x1="570" y1="20" x2="570" y2="80" />
          <line x1="765" y1="80" x2="765" y2="120" />
        </g>
      </svg>
    </Box>
  );
}

export function GeometricGrid({ sx, opacity = 0.05 }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, ${palette.gold} 0.7px, transparent 1.4px),
          linear-gradient(45deg, transparent 48%, ${palette.gold} 49%, ${palette.gold} 51%, transparent 52%),
          linear-gradient(-45deg, transparent 48%, ${palette.gold} 49%, ${palette.gold} 51%, transparent 52%)
        `,
        backgroundSize: '36px 36px, 72px 72px, 72px 72px',
        ...sx
      }}
      aria-hidden
    />
  );
}

export function Crescent({ size = 64, color = palette.gold, sx }) {
  return (
    <Box sx={{ display: 'inline-flex', ...sx }} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="22" fill={color} />
        <circle cx="40" cy="28" r="20" fill={palette.offWhite} />
      </svg>
    </Box>
  );
}
