import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { PhotographyTeaser } from "@/components/photography-teaser"
import { CodeSection } from "@/components/code-section"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PhotographyTeaser />
      <CodeSection />
      <Contact />
    </main>
  )
}
