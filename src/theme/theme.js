import { createTheme } from '@mui/material/styles';

export const palette = {
  ivory: '#F5EFE6',
  offWhite: '#FAF7F2',
  beige: '#E8DDD0',
  warmGray: '#8B7E74',
  softBrown: '#6B4F3F',
  deepBrown: '#3A2A20',
  gold: '#C5A572',
  goldDeep: '#A8854E',
  rose: '#D9B7A6'
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: palette.softBrown, contrastText: palette.offWhite },
    secondary: { main: palette.gold, contrastText: palette.deepBrown },
    background: {
      default: palette.offWhite,
      paper: palette.ivory
    },
    text: {
      primary: palette.deepBrown,
      secondary: palette.warmGray
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
      fontWeight: 300,
      letterSpacing: '0.02em'
    },
    h2: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 300,
      letterSpacing: '0.04em'
    },
    h3: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 400,
      letterSpacing: '0.03em'
    },
    h4: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 400,
      letterSpacing: '0.04em'
    },
    h5: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 500
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.32em',
      textTransform: 'uppercase'
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 300,
      lineHeight: 1.8
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 300,
      lineHeight: 1.7
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.32em',
      textTransform: 'uppercase'
    }
  },
  shape: { borderRadius: 2 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #__next': {
          margin: 0,
          padding: 0,
          width: '100%',
          overflowX: 'hidden',
          backgroundColor: palette.offWhite,
          color: palette.deepBrown
        },
        '*::selection': { background: palette.gold, color: palette.offWhite },
        '::-webkit-scrollbar': { width: 6 },
        '::-webkit-scrollbar-track': { background: palette.ivory },
        '::-webkit-scrollbar-thumb': {
          background: palette.warmGray,
          borderRadius: 4
        }
      }
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          paddingInline: 28,
          paddingBlock: 14,
          borderRadius: 0
        },
        outlined: {
          borderColor: palette.softBrown,
          color: palette.softBrown,
          '&:hover': {
            borderColor: palette.gold,
            color: palette.gold,
            background: 'transparent'
          }
        },
        contained: {
          background: palette.softBrown,
          color: palette.offWhite,
          '&:hover': { background: palette.deepBrown }
        }
      }
    }
  }
});

export default theme;
