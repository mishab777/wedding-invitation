import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { palette } from '@/theme/theme';

const BRUSH_RADIUS = 38;
const REVEAL_THRESHOLD = 0.45;
const SAMPLE_STEP = 8;

function paintCover(ctx, width, height) {
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, palette.beige);
  grad.addColorStop(0.5, palette.gold);
  grad.addColorStop(1, palette.goldDeep);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = palette.deepBrown;
  ctx.lineWidth = 1;
  const step = 22;
  for (let y = -height; y < height * 2; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y + width * 0.4);
    ctx.stroke();
  }
  for (let x = -width; x < width * 2; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height * 0.4, height);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = palette.offWhite;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(10, 10, width - 20, height - 20);
  ctx.strokeStyle = palette.deepBrown;
  ctx.globalAlpha = 0.25;
  ctx.strokeRect(18, 18, width - 36, height - 36);
  ctx.restore();
}

export default function ScratchCard({
  width,
  height,
  onComplete,
  children,
  hint = '✦ Scratch to reveal ✦'
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef(null);
  const completedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setRevealed(true);
    onComplete?.();
  }, [onComplete]);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;
    const data = ctx.getImageData(0, 0, w, h).data;
    let cleared = 0;
    let total = 0;
    for (let y = 0; y < h; y += SAMPLE_STEP) {
      for (let x = 0; x < w; x += SAMPLE_STEP) {
        const alpha = data[(y * w + x) * 4 + 3];
        if (alpha === 0) cleared += 1;
        total += 1;
      }
    }
    if (total > 0 && cleared / total >= REVEAL_THRESHOLD) {
      finish();
    }
  }, [finish]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintCover(ctx, width, height);
  }, [width, height]);

  const getPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const scratchAt = (point) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = BRUSH_RADIUS * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(point.x, point.y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    lastPoint.current = point;
  };

  const handleStart = (e) => {
    if (revealed) return;
    e.preventDefault();
    isDrawing.current = true;
    setHasStarted(true);
    lastPoint.current = null;
    const point = getPoint(e);
    scratchAt(point);
  };

  const handleMove = (e) => {
    if (!isDrawing.current || revealed) return;
    e.preventDefault();
    const point = getPoint(e);
    scratchAt(point);
  };

  const handleEnd = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    lastPoint.current = null;
    checkProgress();
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width,
        height,
        mx: 'auto',
        userSelect: 'none'
      }}
    >
      {/* Hidden underlay revealed by scratch */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center'
        }}
      >
        {children}
      </Box>

      <AnimatePresence>
        {!revealed && (
          <Box
            component={motion.div}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.9, ease: 'easeOut' } }}
            sx={{
              position: 'absolute',
              inset: 0,
              cursor: 'grab',
              touchAction: 'none',
              '&:active': { cursor: 'grabbing' }
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              style={{ display: 'block', borderRadius: 2, touchAction: 'none' }}
            />
            {!hasStarted && (
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'grid',
                  placeItems: 'center',
                  pointerEvents: 'none',
                  textAlign: 'center'
                }}
              >
                <Box>
                  <Box
                    component="svg"
                    viewBox="0 0 64 64"
                    sx={{ width: 44, height: 44, color: palette.deepBrown, mb: 1 }}
                  >
                    <path
                      fill="currentColor"
                      d="M44.6 8.7c1.3-1.3 3.4-1.3 4.6 0l6.1 6.1c1.3 1.3 1.3 3.4 0 4.6L25.6 49.1c-.4.4-.9.7-1.5.8L11 52.6c-1.4.3-2.6-1-2.3-2.3l2.7-13.1c.1-.6.4-1.1.8-1.5L44.6 8.7zm-3.1 8.3 6.5 6.5 4-4-6.5-6.5-4 4z"
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 11,
                      letterSpacing: '0.4em',
                      color: palette.deepBrown,
                      textTransform: 'uppercase'
                    }}
                  >
                    {hint}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}
