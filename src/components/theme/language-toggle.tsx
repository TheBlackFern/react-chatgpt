import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18n from "@/i18n";
import * as React from "react";

export function LanguageToggle() {
  const [lang, setLang] = React.useState(i18n.resolvedLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {lang?.toLocaleUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            i18n.changeLanguage("en");
            setLang("en");
          }}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            i18n.changeLanguage("ru");
            setLang("ru");
          }}
        >
          Русский
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
