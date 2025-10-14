export function HomeBgVideo() {
  return (
    <video
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
      src="/videos/home-page-video.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  );
}
