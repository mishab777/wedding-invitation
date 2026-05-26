import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { palette } from '@/theme/theme';
import { Divider } from './Ornaments';

const moments = [
  {
    year: '2021',
    title: 'A chance meeting',
    arabic: 'البداية',
    text: 'Two strangers crossed paths at a community gathering — a quiet salaam exchanged became the first thread of something written long before.'
  },
  {
    year: '2022',
    title: 'The bond grows',
    arabic: 'المودة',
    text: 'Through conversations of faith, family, and dreams, friendship matured into companionship — built upon trust, prayer, and patience.'
  },
  {
    year: '2024',
    title: 'A promise made',
    arabic: 'الميثاق',
    text: 'Surrounded by family, with sincere intention and humble hearts, a promise was made — a covenant before Allah ﷻ to walk together.'
  },
  {
    year: '2026',
    title: 'A new beginning',
    arabic: 'الأبد',
    text: 'And now, with gratitude, we invite you to witness the start of a lifetime — two souls becoming one home, one love, one ummah.'
  }
];

export default function Story() {
  return (
    <Box
      id="story"
      sx={{
        position: 'relative',
        py: { xs: 12, md: 18 },
        background: `linear-gradient(180deg, ${palette.offWhite} 0%, ${palette.ivory} 100%)`
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography variant="h6" sx={{ color: palette.gold, fontSize: 11 }}>
            Our journey
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
            The story of us
          </Typography>
          <Typography
            className="arabic"
            sx={{ color: palette.warmGray, mt: 1, fontSize: { xs: 18, md: 22 } }}
          >
            قصة حب كتبها القدر
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 24, md: '50%' },
              top: 0,
              bottom: 0,
              width: '1px',
              background: `linear-gradient(180deg, transparent 0%, ${palette.gold}88 10%, ${palette.gold}88 90%, transparent 100%)`,
              transform: { md: 'translateX(-0.5px)' }
            }}
          />

          {moments.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <Box
                key={m.year}
                component={motion.div}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                sx={{
                  position: 'relative',
                  mb: { xs: 6, md: 8 },
                  pl: { xs: 7, md: 0 }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 18, md: '50%' },
                    top: 12,
                    width: 14,
                    height: 14,
                    background: palette.offWhite,
                    border: `1.5px solid ${palette.gold}`,
                    transform: { xs: 'rotate(45deg)', md: 'translateX(-50%) rotate(45deg)' },
                    zIndex: 2
                  }}
                />
                <Grid container spacing={{ xs: 2, md: 6 }} alignItems="center">
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      order: { xs: 1, md: left ? 1 : 2 },
                      textAlign: { xs: 'left', md: left ? 'right' : 'left' }
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: palette.gold, fontSize: 10, letterSpacing: '0.5em' }}
                    >
                      {m.year}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: { xs: 30, md: 40 },
                        fontStyle: 'italic',
                        color: palette.softBrown,
                        mt: 0.5
                      }}
                    >
                      {m.title}
                    </Typography>
                    <Typography className="arabic" sx={{ color: palette.warmGray, fontSize: 18, mt: 0.5 }}>
                      {m.arabic}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ order: { xs: 2, md: left ? 2 : 1 } }}
                  >
                    <Typography
                      sx={{
                        color: palette.warmGray,
                        fontSize: { xs: 15, md: 16 },
                        lineHeight: 1.8,
                        maxWidth: 360,
                        ml: { md: left ? 0 : 'auto' }
                      }}
                    >
                      {m.text}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
