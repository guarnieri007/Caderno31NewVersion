export type ThemeMode = "dark" | "light"

export type ThemeCollection = {
  [variant: string]: {
    dark?: any
    light?: any
  }
}

const modules = import.meta.glob("./*_theme.ts", { eager: true })

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

  themes[variant][mode] = (module as any).default
})