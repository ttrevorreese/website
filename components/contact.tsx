import Link from "next/link"
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"
import { TextReveal } from "./animations/text-reveal"
import { FadeUp } from "./animations/fade-up"
import { profile } from "@/content/profile"

const socials = [
  { label: "Email", href: profile.social.email, icon: FaEnvelope },
  { label: "GitHub", href: profile.social.github, icon: FaGithub },
  { label: "LinkedIn", href: profile.social.linkedin, icon: FaLinkedin },
  { label: "Instagram", href: profile.social.instagram, icon: FaInstagram },
]

export function Contact() {
  return (
    <footer id="contact" className="py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <TextReveal wrapperClassName="mb-4">
            <p className="text-xs tracking-[0.35em] uppercase text-muted">Contact</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2
              className="text-3xl sm:text-4xl font-light"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Let&apos;s connect.
            </h2>
          </TextReveal>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-8 mb-24">
          {socials.map(({ label, href, icon: Icon }, i) => (
            <FadeUp key={label} delay={i * 0.08}>
              <Link
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-3 text-muted hover:text-foreground transition-colors group"
              >
                <Icon size={16} className="transition-transform group-hover:-translate-y-0.5" />
                <span className="text-xs tracking-[0.2em] uppercase">{label}</span>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Bottom line */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-muted tracking-widest">
          <span className="uppercase">{profile.name}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
