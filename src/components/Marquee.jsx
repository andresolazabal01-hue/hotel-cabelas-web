const ITEMS = [
  "Limpieza impecable",
  "Seguridad en el ingreso",
  "Atención 24/7",
  "A/C · TV · Wifi",
  "Reserva directa",
];

export default function Marquee() {
  const row = (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="flex shrink-0 items-center gap-8 md:gap-14">
          <span className="font-display text-base font-normal text-cream/75">
            {item}
          </span>
          <span className="text-brand-soft/60">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden bg-deep py-5">
      <div className="animate-marquee flex w-max gap-8 md:gap-14">
        {row}
        {row}
      </div>
    </div>
  );
}
