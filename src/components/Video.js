import React from 'react';

function Video() {
  return (
    <div className="video-background">
      <iframe
        title="Background Video"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="acceloremeter; autoplay; encrypted-media; gyroscope; clipboard-write"
        src="https://www.youtube.com/embed/gnZImHvA0ME?autoplay=1&controls=0&mute=1&loop=1&modestbrading=1&showinfo=0&start=50&enablejsonapi=1&&widgetid=3"
      />
    </div>
  );
}

export default Video;
