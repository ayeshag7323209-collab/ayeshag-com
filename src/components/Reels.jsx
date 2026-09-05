import { socialLinks, socialReels } from "../data/content.js";
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon, ArrowIcon } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

const platforms = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
  { key: "tiktok", label: "TikTok", Icon: TiktokIcon },
];

// Pulls the video id out of the handful of URL shapes YouTube actually
// hands out (watch?v=, youtu.be/, /shorts/, /embed/) so a plain "copy from
// the address bar" link works without the person having to build an embed
// URL themselves.
function youtubeId(url) {
  const patterns = [
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/shorts\/([^?&/]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
    /[?&]v=([^?&/]+)/,
  ];
  for (const re of patterns) {
    const match = url.match(re);
    if (match) return match[1];
  }
  return null;
}

function tiktokId(url) {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

// Turns one pasted post/video URL into the right iframe src for its
// platform. Returns null for a URL that doesn't match the expected shape,
// so a mistyped link is skipped instead of rendering a broken embed.
function embedSrc(platform, url) {
  switch (platform) {
    case "instagram":
      return `${url.split("?")[0].replace(/\/$/, "")}/embed`;
    case "facebook":
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
    case "youtube": {
      const id = youtubeId(url);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    case "tiktok": {
      const id = tiktokId(url);
      return id ? `https://www.tiktok.com/embed/v2/${id}` : null;
    }
    default:
      return null;
  }
}

export default function Reels() {
  return (
    <section id="reels" className="reels">
      <div className="container">
        <Reveal as="div" className="section-heading">
          <p className="eyebrow">Follow Along</p>
          <h2 className="section-title">Reels &amp; Videos From Our Feeds</h2>
          <p className="section-lede">
            New arrivals, behind-the-scenes stitching, and embroidery in
            progress — follow Ayesha G Garments on Instagram, Facebook,
            YouTube, and TikTok for the latest.
          </p>
        </Reveal>

        <div className="reels__grid">
          {platforms.map(({ key, label, Icon }, i) => {
            const urls = socialReels[key] || [];
            const profileHref = socialLinks[key] || "#";
            const embeds = urls.map((url) => ({ url, src: embedSrc(key, url) })).filter((e) => e.src);

            return (
              <Reveal as="div" key={key} delay={i} className="reels__column">
                <div className="reels__column-head">
                  <span className={`reels__icon reels__icon--${key}`}>
                    <Icon width={22} height={22} />
                  </span>
                  <span className="reels__platform">{label}</span>
                </div>

                {embeds.length > 0 ? (
                  <div className="reels__embeds">
                    {embeds.map(({ url, src }) => (
                      <div className="reels__embed" key={url}>
                        <iframe
                          src={src}
                          loading="lazy"
                          allow="autoplay; encrypted-media; clipboard-write; picture-in-picture; web-share"
                          allowFullScreen
                          title={`${label} reel`}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <a
                    href={profileHref}
                    className="reels__follow"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={`reels__follow-icon reels__icon--${key}`}>
                      <Icon width={26} height={26} />
                    </span>
                    <span className="reels__follow-text">Follow us on {label}</span>
                    <span className="reels__follow-arrow" aria-hidden="true">
                      <ArrowIcon width={18} height={18} />
                    </span>
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>

        <p className="reels__note">
          Reels go live here as soon as our latest posts are linked in —
          follow any page above in the meantime to catch new arrivals first.
        </p>
      </div>
    </section>
  );
}
