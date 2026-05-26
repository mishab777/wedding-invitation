import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { palette } from '@/theme/theme';
import { Divider, GeometricGrid } from './Ornaments';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    background: palette.offWhite,
    '& fieldset': { borderColor: `${palette.warmGray}55` },
    '&:hover fieldset': { borderColor: palette.gold },
    '&.Mui-focused fieldset': { borderColor: palette.gold, borderWidth: '1px' }
  },
  '& .MuiInputLabel-root': {
    color: palette.warmGray,
    letterSpacing: '0.2em',
    fontSize: 12,
    textTransform: 'uppercase'
  },
  '& .MuiInputLabel-root.Mui-focused': { color: palette.gold },
  '& .MuiOutlinedInput-input': { fontSize: 15, py: 1.8 }
};

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    guests: '1',
    attendance: 'attending',
    message: ''
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    setForm({ name: '', email: '', guests: '1', attendance: 'attending', message: '' });
  };

  return (
    <Box
      id="rsvp"
      sx={{
        position: 'relative',
        py: { xs: 12, md: 18 },
        background: `linear-gradient(180deg, ${palette.ivory} 0%, ${palette.beige} 100%)`,
        overflow: 'hidden'
      }}
    >
      <GeometricGrid opacity={0.04} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="h6" sx={{ color: palette.gold, fontSize: 11 }}>
            With sincere honour
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
            Kindly RSVP
          </Typography>
          <Typography
            className="arabic"
            sx={{ color: palette.warmGray, mt: 1, fontSize: { xs: 18, md: 22 } }}
          >
            بارك الله لكما وبارك عليكما
          </Typography>
          <Typography
            sx={{
              color: palette.warmGray,
              mt: 2,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: 18,
              maxWidth: 520,
              mx: 'auto'
            }}
          >
            Your presence and du’as mean the world to us. Please confirm by 1 December 2026.
          </Typography>
          <Divider />
        </Box>

        <Box
          component={motion.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            background: palette.offWhite,
            border: `1px solid ${palette.gold}55`,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: 22,
              height: 22,
              border: `1px solid ${palette.gold}`
            },
            '&::before': { top: -1, left: -1, borderRight: 'none', borderBottom: 'none' },
            '&::after': { bottom: -1, right: -1, borderLeft: 'none', borderTop: 'none' }
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="name"
                label="Full name"
                value={form.name}
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="email"
                type="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="attendance"
                label="Will you attend?"
                value={form.attendance}
                onChange={handleChange}
                sx={fieldSx}
              >
                <MenuItem value="attending">Joyfully accepts</MenuItem>
                <MenuItem value="not_attending">Regretfully declines</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="guests"
                label="Guests"
                value={form.guests}
                onChange={handleChange}
                sx={fieldSx}
              >
                {['1', '2', '3', '4', '5'].map((n) => (
                  <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="message"
                label="A blessing or message"
                value={form.message}
                onChange={handleChange}
                multiline
                rows={4}
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<FavoriteBorderOutlinedIcon />}
                sx={{ px: 6, py: 1.8 }}
              >
                Send my RSVP
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={4500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="JazakAllahu khairan — your RSVP has been received."
        sx={{
          '& .MuiSnackbarContent-root': {
            background: palette.softBrown,
            color: palette.offWhite,
            borderRadius: 0,
            letterSpacing: '0.1em',
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 16,
            fontStyle: 'italic'
          }
        }}
      />
    </Box>
  );
}
