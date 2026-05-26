import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DateReveal from '@/components/DateReveal';
import Countdown from '@/components/Countdown';
import Events from '@/components/Events';
import Story from '@/components/Story';
import Gallery from '@/components/Gallery';
import Quotes from '@/components/Quotes';
import Location from '@/components/Location';
import RSVP from '@/components/RSVP';
import Footer from '@/components/Footer';
import AudioController from '@/components/AudioController';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = useCallback(() => {
    setLoaded(true);
    audioRef.current?.play();
  }, []);

  const handleReveal = useCallback(() => {
    if (hasRevealed) return;
    setHasRevealed(true);
    audioRef.current?.play();
  }, [hasRevealed]);

  const handleToggleAudio = useCallback(() => {
    audioRef.current?.toggle();
  }, []);

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loaded]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Loader onOpen={handleOpen} />
      <Navbar audioOn={audioOn} onToggleAudio={handleToggleAudio} />
      <AudioController ref={audioRef} onStateChange={setAudioOn} />

      <Hero />
      <DateReveal onReveal={handleReveal} />
      <Countdown />
      <Events />
      <Story />
      <Gallery />
      <Quotes />
      <Location />
      <RSVP />
      <Footer />
    </Box>
  );
}
