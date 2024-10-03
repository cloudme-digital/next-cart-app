/**
 * Renders Hero section for Index page
 * @function Hero
 * @returns {JSX.Element} - Rendered component
 */
const Hero = () => (
  <section id="hero" className="relative w-full">
    <div
      className="w-full h-0 bg-hero-background sm:bg-none bg-no-repeat bg-cover bg-top"
      style={{ paddingBottom: 'calc(100% / (1920 / 1080))' }}
    >
      <div className="hidden sm:block absolute inset-0 bg-hero-background bg-no-repeat bg-contain bg-center w-full h-full" />
    </div>
  </section>
);

export default Hero;
