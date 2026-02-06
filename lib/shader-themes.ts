export interface ShaderTheme {
    name: string
    swirl: {
        colorA: string
        colorB: string
    }
    chromaFlow: {
        baseColor: string
        upColor: string
        downColor: string
        leftColor: string
        rightColor: string
    }
}

export const shaderThemes: Record<string, ShaderTheme> = {
    default: {
        name: "Original Blue/Orange",
        swirl: {
            colorA: "#1275d8",
            colorB: "#e19136",
        },
        chromaFlow: {
            baseColor: "#0066ff",
            upColor: "#0066ff",
            downColor: "#d1d1d1",
            leftColor: "#e19136",
            rightColor: "#e19136",
        },
    },
    modern: {
        name: "Modern Cyberpunk",
        swirl: {
            colorA: "#7928ca", // Purple
            colorB: "#00dfd8", // Cyan
        },
        chromaFlow: {
            baseColor: "#1d1d2b", // Dark violet base
            upColor: "#7928ca", // Purple
            downColor: "#ff0080", // Magenta
            leftColor: "#00dfd8", // Cyan
            rightColor: "#4f4f4f", // Grey accent
        },
    },
    professional: {
        name: "Professional Trust",
        swirl: {
            colorA: "#0f172a", // Navy
            colorB: "#10b981", // Emerald
        },
        chromaFlow: {
            baseColor: "#0f172a", // Navy
            upColor: "#0f172a", // Navy
            downColor: "#cbd5e1", // Slate
            leftColor: "#10b981", // Emerald
            rightColor: "#3b82f6", // Blue
        },
    },
    monochrome: {
        name: "Sleek Monochrome",
        swirl: {
            colorA: "#000000", // Black
            colorB: "#ffffff", // White
        },
        chromaFlow: {
            baseColor: "#000000", // Black
            upColor: "#333333", // Dark Grey
            downColor: "#d4d4d4", // Light Grey
            leftColor: "#ffffff", // White
            rightColor: "#737373", // Mid Grey
        },
    },
    sunset: {
        name: "Warm Sunset",
        swirl: {
            colorA: "#c2410c", // Orange Red
            colorB: "#db2777", // Pink
        },
        chromaFlow: {
            baseColor: "#4a044e", // Dark Magenta
            upColor: "#db2777", // Pink
            downColor: "#f97316", // Orange
            leftColor: "#c2410c", // Red Orange
            rightColor: "#fbbf24", // Amber
        },
    },
    ocean: {
        name: "Deep Ocean",
        swirl: {
            colorA: "#1e3a8a", // Dark Blue
            colorB: "#06b6d4", // Cyan
        },
        chromaFlow: {
            baseColor: "#0f172a", // Slate 900
            upColor: "#1e40af", // Blue 800
            downColor: "#0ea5e9", // Sky 500
            leftColor: "#06b6d4", // Cyan 500
            rightColor: "#ecfeff", // Azure
        },
    },
    forest: {
        name: "Mystic Forest",
        swirl: {
            colorA: "#14532d", // Green
            colorB: "#166534", // Green
        },
        chromaFlow: {
            baseColor: "#022c22", // Dark Green
            upColor: "#15803d", // Green
            downColor: "#a3e635", // Lime
            leftColor: "#facc15", // Yellow
            rightColor: "#3f6212", // Olive
        },
    },
    neon: {
        name: "Neon Night",
        swirl: {
            colorA: "#000000", // Black
            colorB: "#22c55e", // Green
        },
        chromaFlow: {
            baseColor: "#000000", // Black
            upColor: "#22c55e", // Green
            downColor: "#ea580c", // Orange
            leftColor: "#e11d48", // Rose Red
            rightColor: "#eab308", // Yellow
        },
    },
    midnight: {
        name: "Midnight",
        swirl: {
            colorA: "#312e81", // Indigo 900
            colorB: "#4c1d95", // Violet 900
        },
        chromaFlow: {
            baseColor: "#020617", // Slate 950
            upColor: "#312e81", // Indigo 900
            downColor: "#1e1b4b", // Indigo 950
            leftColor: "#581c87", // Purple 900
            rightColor: "#172554", // Blue 950
        },
    },
    cottonCandy: {
        name: "Cotton Candy",
        swirl: {
            colorA: "#f9a8d4", // Pink 300
            colorB: "#93c5fd", // Blue 300
        },
        chromaFlow: {
            baseColor: "#fdf2f8", // Pink 50
            upColor: "#f9a8d4", // Pink 300
            downColor: "#93c5fd", // Blue 300
            leftColor: "#f0abfc", // Fuchsia 300
            rightColor: "#bae6fd", // Sky 200
        },
    },
}

export type ThemeKey = keyof typeof shaderThemes
