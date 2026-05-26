import { Box, Container, Typography } from '@mui/material';
import { palette } from '@/theme/theme';
import { Divider, MosqueSilhouette } from './Ornaments';

export default function Footer() {
  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 10, md: 14 },
        background: `linear-gradient(180deg, ${palette.beige} 0%, ${palette.softBrown} 100%)`,
        color: palette.offWhite,
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      <MosqueSilhouette opacity={0.12} sx={{ bottom: -10 }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          className="arabic"
          sx={{
            color: palette.offWhite,
            fontSize: { xs: 26, md: 36 },
            lineHeight: 1.6,
            opacity: 0.95
          }}
        >
          بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </Typography>
        <Typography
          sx={{
            color: `${palette.ivory}cc`,
            mt: 3,
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: { xs: 18, md: 22 },
            maxWidth: 620,
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          “May Allah bless you, shower His blessings upon you, and unite you both in goodness.”
        </Typography>

        <Divider color={`${palette.gold}`} />

        <Typography
          variant="h2"
          sx={{
            fontStyle: 'italic',
            fontSize: { xs: 48, md: 80 },
            color: palette.offWhite,
            mt: 2
          }}
        >
          Aisha &amp; Ahmed
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: palette.gold,
            mt: 1.5,
            fontSize: 11,
            letterSpacing: '0.5em'
          }}
        >
          12 . 12 . 2026
        </Typography>

        <Typography
          sx={{
            mt: 6,
            fontSize: 11,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: `${palette.ivory}99`
          }}
        >
          Designed with love · For an unforgettable beginning
        </Typography>
      </Container>
    </Box>
  );
}
