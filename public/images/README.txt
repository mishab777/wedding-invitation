Optional: drop portrait photos here.

  /public/images/bride.jpg
  /public/images/groom.jpg

To wire them up, open src/components/Hero.js and pass an `image` prop to
each PortraitCard:

  <PortraitCard
    name="Aisha"
    arabicName="عائشة"
    role="The Bride"
    image="/images/bride.jpg"
  />

If no image is provided the cards fall back to an elegant
gold-monogram silhouette - the page still looks complete.
