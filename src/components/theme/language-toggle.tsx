import * as React from "react";
import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import i18n from "@/i18n";

export function LanguageToggle() {
  const [lang, setLang] = React.useState(i18n.resolvedLanguage);

  return (
    <DropdownMenu.DropdownMenu>
      <DropdownMenu.DropdownMenuTrigger asChild>
        <Button data-testid="lang-switch" variant="outline" size="icon">
          {lang?.toLocaleUpperCase()}
        </Button>
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent align="end">
        <DropdownMenu.DropdownMenuItem
          onClick={() => {
            i18n.changeLanguage("en");
            setLang("en");
          }}
        >
          English
        </DropdownMenu.DropdownMenuItem>
        <DropdownMenu.DropdownMenuItem
          onClick={() => {
            i18n.changeLanguage("ru");
            setLang("ru");
          }}
        >
          Русский
        </DropdownMenu.DropdownMenuItem>
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}
