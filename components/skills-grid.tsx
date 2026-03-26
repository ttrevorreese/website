import { FadeUp } from "./animations/fade-up"
import { skills } from "@/content/skills"
import type { Skill } from "@/content/types"

const categoryOrder: Skill["category"][] = ["language", "framework", "tool", "platform"]
const categoryLabel: Record<Skill["category"], string> = {
  language: "Languages",
  framework: "Frameworks",
  tool: "Tools",
  platform: "Platforms",
}

export function SkillsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
      {categoryOrder.map((category, ci) => {
        const group = skills.filter((s) => s.category === category)
        if (group.length === 0) return null
        return (
          <FadeUp key={category} delay={ci * 0.08}>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted mb-4">
                {categoryLabel[category]}
              </p>
              <ul className="space-y-2">
                {group.map((skill) => (
                  <li key={skill.name} className="text-sm font-mono text-foreground/80">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        )
      })}
    </div>
  )
}
