import { ThemeType } from "../interfaces"

export type ThemeMode = "dark" | "light"

export type ThemeCollection = {
  [variant: string]: {
    dark?: ThemeType
    light?: ThemeType
  }
}

const modules = import.meta.glob("./*_theme.ts", { eager: true }) as Record<string, Record<string, unknown>>

export const themes: ThemeCollection = {}

Object.entries(modules).forEach(([path, module]) => {

  const file = path.split("/").pop() || ""

  const parts = file.replace(".ts", "").split("_")

  if (parts.length !== 3) return

  const [variant, mode] = parts

  if (mode !== "dark" && mode !== "light") return

  if (!themes[variant]) {
    themes[variant] = {}
  }

  const exportedTheme =
    (module.default as ThemeType | undefined)
    ?? (Object.values(module)[0] as ThemeType | undefined)

  if (!exportedTheme) return

  themes[variant][mode] = exportedTheme
})
