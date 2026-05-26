import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { palette } from '@/theme/theme';
import { Divider, GeometricGrid, MosqueSilhouette } from './Ornaments';

const quotes = [
  {
    arabic: 'وَجَعَلَ بَيْنَكُم مَوَدَّةً وَرَحْمَةً',
    english: '“And He placed between you affection and mercy.”',
    cite: 'Qur’an, Surah Ar-Rum 30:21'
  },
  {
    arabic: 'هُنَّ لِبَاسٌ لَكُمْ وَأَنْتُمْ لِبَاسٌ لَهُنَّ',
    english: '“They are a garment for you, and you are a garment for them.”',
    cite: 'Qur’an, Surah Al-Baqarah 2:187'
  },
  {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
    english:
      '“And among His signs is that He created for you from yourselves mates that you may find tranquility in them.”',
    cite: 'Qur’an, Surah Ar-Rum 30:21'
  }
];

export default function Quotes() {
  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 12, md: 20 },
        background: `linear-gradient(180deg, ${palette.beige} 0%, ${palette.ivory} 100%)`,
        overflow: 'hidden'
      }}
    >
      <GeometricGrid opacity={0.04} />
      <MosqueSilhouette opacity={0.05} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography variant="h6" sx={{ color: palette.gold, fontSize: 11 }}>
            ✦ Words of blessing ✦
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontStyle: 'italic',
              color: palette.softBrown,
              fontSize: { xs: 44, md: 72 },
              mt: 1.5
            }}
          >
            Quranic reflections
          </Typography>
          <Divider />
        </Box>

        {quotes.map((q, i) => (
          <Box
            key={i}
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            sx={{
              textAlign: 'center',
              py: { xs: 5, md: 7 },
              borderTop: i === 0 ? `1px solid ${palette.gold}33` : 'none',
              borderBottom: `1px solid ${palette.gold}33`,
              position: 'relative'
            }}
          >
            <Typography
              className="arabic"
              sx={{
                color: palette.softBrown,
                fontSize: { xs: 28, md: 42 },
                lineHeight: 1.7,
                letterSpacing: 0
              }}
            >
              {q.arabic}
            </Typography>
            <Typography
              sx={{
                color: palette.warmGray,
                mt: 2.5,
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: 'italic',
                fontSize: { xs: 18, md: 24 },
                maxWidth: 620,
                mx: 'auto',
                lineHeight: 1.5
              }}
            >
              {q.english}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: palette.gold,
                mt: 2,
                fontSize: 10,
                letterSpacing: '0.4em'
              }}
            >
              {q.cite}
            </Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
