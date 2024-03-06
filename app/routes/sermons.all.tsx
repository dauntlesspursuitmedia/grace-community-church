export default function AllSermonsRoute() {
	return (
    <div>
      <iframe
        tabIndex={-1}
        width="1"
				title="All Sermons"
        height="540"
        src="https://embed.sermonaudio.com/browser/broadcaster/cbcofmanchestertn/?sort=newest&page_size=25&style=compact&header=false&rounded=true&external_borders=false&theme=dark"
        className="min-w-full max-w-full"
        allow="autoplay"
      ></iframe>
    </div>
  );
}
