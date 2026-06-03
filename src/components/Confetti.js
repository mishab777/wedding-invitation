import { useMemo } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { palette } from '@/theme/theme';

const PIECE_COLORS = [
  palette.gold,
  palette.goldDeep,
  palette.rose,
  palette.softBrown,
  palette.ivory,
  palette.offWhite
];

const SHAPES = ['rect', 'circle', 'sparkle', 'petal'];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function Piece({ piece, durationMul = 1 }) {
  const { angle, distance, delay, size, color, rotateEnd, shape, drift } = piece;
  const radians = (angle * Math.PI) / 180;
  const x = Math.cos(radians) * distance;
  const y = Math.sin(radians) * distance;

  const common = {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 },
    animate: {
      x: [0, x * 0.6, x + drift],
      y: [0, y * 0.6, y + distance * 0.55],
      opacity: [0, 1, 1, 0],
      scale: [0.4, 1, 1, 0.8],
      rotate: [0, rotateEnd * 0.6, rotateEnd]
    },
    transition: {
      duration: randomBetween(1.6, 2.4) * durationMul,
      delay,
      ease: [0.18, 0.7, 0.25, 1],
      times: [0, 0.25, 0.7, 1]
    }
  };

  if (shape === 'circle') {
    return (
      <Box
        component={motion.span}
        {...common}
        sx={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 ${size * 0.6}px ${color}66`
        }}
      />
    );
  }

  if (shape === 'sparkle') {
    return (
      <Box
        component={motion.span}
        {...common}
        sx={{
          position: 'absolute',
          width: size * 1.2,
          height: size * 1.2,
          color,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
          <path d="M12 0 L13.6 9.2 L24 12 L13.6 14.8 L12 24 L10.4 14.8 L0 12 L10.4 9.2 Z" />
        </svg>
      </Box>
    );
  }

  if (shape === 'petal') {
    return (
      <Box
        component={motion.span}
        {...common}
        sx={{
          position: 'absolute',
          width: size * 1.4,
          height: size * 0.7,
          background: color,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          opacity: 0.85
        }}
      />
    );
  }

  return (
    <Box
      component={motion.span}
      {...common}
      sx={{
        position: 'absolute',
        width: size * 1.6,
        height: size * 0.5,
        background: color,
        borderRadius: 1
      }}
    />
  );
}

export default function Confetti({ count = 80, active = false, spread = 520 }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const angle = randomBetween(-170, -10);
      return {
        angle,
        distance: randomBetween(spread * 0.45, spread),
        delay: randomBetween(0, 0.35),
        size: randomBetween(6, 14),
        color: PIECE_COLORS[Math.floor(Math.random() * PIECE_COLORS.length)],
        rotateEnd: randomBetween(-540, 540),
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        drift: randomBetween(-60, 60)
      };
    });
  }, [count, spread]);

  if (!active) return null;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      {pieces.map((p, i) => (
        <Piece key={i} piece={p} />
      ))}
    </Box>
  );
}
