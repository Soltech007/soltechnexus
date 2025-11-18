export default function MapEmbed() {
  return (
    <div className="map-embed">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!..." // replace with actual location url
        width="100%"
        height="300"
        allowFullScreen
        loading="lazy"
        title="Our Location"
      />
    </div>
  );
}