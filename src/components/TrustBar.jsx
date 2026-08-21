import { stats } from "../data/content.js";
import { ClockIcon, SparkleIcon, NetworkIcon, ScissorsIcon } from "./Icons.jsx";
import useReveal from "../hooks/useReveal.js";
import useCountUp from "../hooks/useCountUp.js";
import useParallax from "../hooks/useParallax.js";
import useScrollProgress from "../hooks/useScrollProgress.js";

const statIcons = [ClockIcon, SparkleIcon, NetworkIcon, ScissorsIcon];

function Stat({ stat, delay, Icon, strength }) {
  const [revealRef, visible] = useReveal();
  const [iconRef, offset] = useParallax(strength);
  const display = useCountUp(stat.value, visible);

  return (
    <div
      className={`trustbar__item reveal ${visible ? "is-visible" : ""}`}
      ref={revealRef}
      style={{ "--reveal-delay": `${delay * 90}ms` }}
    >
      <span className="trustbar__icon" ref={iconRef} style={{ transform: `translateY(${offset}px)` }}>
        <Icon />
      </span>
      <span className="trustbar__value">{display}</span>
      <span className="trustbar__label">{stat.label}</span>
    </div>
  );
}

export default function TrustBar() {
  const [sectionRef, progress] = useScrollProgress();

  return (
    <section className="trustbar" ref={sectionRef}>
      <div className="trustbar__rule" style={{ "--progress": progress }} aria-hidden="true" />
      <div className="container trustbar__inner">
        {stats.map((stat, i) => (
          <Stat
            stat={stat}
            key={stat.label}
            delay={i}
            Icon={statIcons[i % statIcons.length]}
            strength={10 + i * 4}
          />
        ))}
      </div>
      <div className="trustbar__rule trustbar__rule--bottom" style={{ "--progress": progress }} aria-hidden="true" />
    </section>
  );
}
