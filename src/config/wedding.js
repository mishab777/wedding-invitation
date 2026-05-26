export const WEDDING_DATE_ISO = '2026-12-12T16:00:00+04:00';

export const WEDDING = {
  date: WEDDING_DATE_ISO,
  displayDate: 'Saturday, December 12, 2026',
  dayMonthYear: { day: '12', month: 'December', year: '2026' },
  time: '4:00 PM onwards',
  bride: { name: 'Aisha', arabicName: 'عائشة' },
  groom: { name: 'Ahmed', arabicName: 'أحمد' },
  venue: {
    name: 'Al-Noor Banquet Hall',
    address: 'Sheikh Zayed Road, Dubai, UAE',
    mapsQuery: 'Sheikh+Zayed+Road,+Dubai,+UAE'
  },
  events: [
    {
      title: 'Nikah Ceremony',
      arabic: 'النكاح',
      date: 'Friday, December 11, 2026',
      time: '7:00 PM',
      place: 'Jumeirah Grand Mosque',
      description: 'A sacred bond witnessed in the house of Allah, with our closest family.'
    },
    {
      title: 'Walima Reception',
      arabic: 'الوليمة',
      date: 'Saturday, December 12, 2026',
      time: '4:00 PM – 11:00 PM',
      place: 'Al-Noor Banquet Hall',
      description: 'A celebration of love, family, and the journey ahead — dinner & blessings.'
    }
  ]
};
