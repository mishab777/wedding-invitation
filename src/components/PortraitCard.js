import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { palette } from '@/theme/theme';
import { ArchFrame } from './Ornaments';

export default function PortraitCard({ name, role, arabicName, image, side = 'left' }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: side === 'right' ? 0.15 : 0 }}
      sx={{ position: 'relative', maxWidth: 360, width: '100%', mx: 'auto' }}
    >
      <ArchFrame>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: image
              ? `url(${image}) center/cover no-repeat`
              : `linear-gradient(160deg, ${palette.beige} 0%, ${palette.warmGray} 100%)`,
            filter: 'saturate(0.85) brightness(0.96)'
          }}
        />
        {!image && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              color: palette.offWhite,
              opacity: 0.5,
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 90,
              fontStyle: 'italic'
            }}
          >
            {name.charAt(0)}
          </Box>
        )}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 50%, ${palette.deepBrown}aa 100%)`
          }}
        />
        <Box sx={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
          <Typography
            sx={{
              fontFamily: '"Amiri", serif',
              color: palette.offWhite,
              fontSize: 20,
              opacity: 0.92
            }}
          >
            {arabicName}
          </Typography>
        </Box>
      </ArchFrame>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6" sx={{ color: palette.gold, fontSize: 11, mb: 1 }}>
          {role}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: palette.softBrown,
            fontStyle: 'italic',
            fontSize: { xs: 44, md: 56 }
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
}
