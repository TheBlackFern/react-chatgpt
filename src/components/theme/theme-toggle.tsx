import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const { t } = useTranslation(["theme"]);
  return (
    <DropdownMenu.DropdownMenu>
      <DropdownMenu.DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t("description")}</span>
        </Button>
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent align="end">
        <DropdownMenu.DropdownMenuItem onClick={() => setTheme("light")}>
          {t("light")}
        </DropdownMenu.DropdownMenuItem>
        <DropdownMenu.DropdownMenuItem onClick={() => setTheme("dark")}>
          {t("dark")}
        </DropdownMenu.DropdownMenuItem>
        <DropdownMenu.DropdownMenuItem onClick={() => setTheme("system")}>
          {t("system")}
        </DropdownMenu.DropdownMenuItem>
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}
