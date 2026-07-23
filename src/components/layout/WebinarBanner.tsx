export default function WebinarBanner() {
  return (
    <div
      id="webinar-banner"
      style={{
        background: 'linear-gradient(135deg, #0d2240, #1B3A5F)',
        color: '#fff',
        padding: '8px 0',
        borderBottom: '2px solid #C41E2A',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
    >
      <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1.5 text-center px-4 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2">
          <span className="bg-[#C41E2A] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap">
            Free Webinar
          </span>
          <span className="text-[15px] sm:text-[15px] text-[13px] font-semibold">
            Level Up Your ATC Career
          </span>
        </div>
        <span className="text-[11px] sm:text-[13px] opacity-85">
          Thu, July 30 &middot; 12:30 PM ET
        </span>
        <a
          href="/webinars/level-up-your-atc-career"
          className="bg-[#C41E2A] text-white no-underline text-[12px] sm:text-[13px] font-semibold px-3 sm:px-4 py-1.5 rounded whitespace-nowrap hover:brightness-110 transition-all"
        >
          Register Free →
        </a>
      </div>
    </div>
  );
}
