import Image from "next/image"
import { FadeUp } from "./animations/fade-up"
import { TextReveal } from "./animations/text-reveal"
import { profile } from "@/content/profile"

export function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Photo */}
        <FadeUp className="order-2 md:order-1">
          <div className="relative aspect-square w-full max-w-sm mx-auto md:mx-0 overflow-hidden">
            <Image
              src={profile.photo}
              alt={`${profile.name} — portrait`}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </FadeUp>

        {/* Bio */}
        <div className="order-1 md:order-2">
          <TextReveal wrapperClassName="mb-8">
            <p className="text-xs tracking-[0.35em] uppercase text-muted">About</p>
          </TextReveal>

          <TextReveal delay={0.1} wrapperClassName="mb-10">
            <h2
              className="text-3xl sm:text-4xl font-light leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Two crafts,
              <br />
              one curiosity.
            </h2>
          </TextReveal>

          <div className="space-y-5">
            {profile.bio.map((paragraph, i) => (
              <FadeUp key={i} delay={0.1 * (i + 1)}>
                <p className="text-muted leading-relaxed text-sm">{paragraph}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
