"use client"

export const BackgroundVideo = () => {
  const src = "/videos/landing-bg.mp4"
  return (
    <div className={`hidden sm:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 inset-0 overflow-hidden w-[72%] aspect-video rounded-2xl ml-20`}>
      <video
        className="w-full object-cover rounded-2xl"
        src={src}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  )
}
