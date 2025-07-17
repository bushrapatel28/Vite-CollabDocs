import React from "react";
import { Monitor, Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";

interface ThemeSelectorProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export default function ThemeSelector({
  variant = "ghost",
  size = "icon",
  showLabel = false,
}: ThemeSelectorProps) {
  const { theme, setTheme, actualTheme } = useTheme();

  const themes = [
    {
      value: "light" as const,
      label: "Light",
      icon: Sun,
      description: "Light theme with bright colors",
    },
    {
      value: "dark" as const,
      label: "Dark",
      icon: Moon,
      description: "Dark theme with muted colors",
    },
    {
      value: "system" as const,
      label: "System",
      icon: Monitor,
      description: "Follow system preference",
    },
  ];

  const currentTheme = themes.find((t) => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Palette;

  return (
    <div className="bg-background">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className="relative"
            aria-label="Toggle theme"
          >
            <CurrentIcon className="h-4 w-4" />
            {showLabel && (
              <span className="ml-2">{currentTheme?.label || "Theme"}</span>
            )}
            {actualTheme === "dark" && theme === "system" && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Theme Selection
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.value;

            return (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className={`flex items-center gap-3 cursor-pointer ${
                  isSelected ? "bg-accent" : ""
                }`}
              >
                <Icon className="h-4 w-4" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{themeOption.label}</span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {themeOption.description}
                  </p>
                </div>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <div className="px-2 py-1.5">
            <p className="text-xs text-muted-foreground">
              Current: {actualTheme === "dark" ? "Dark" : "Light"} mode
              {theme === "system" && " (System)"}
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
