import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { m } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

type ButtonResetProps = {
  submitted?: boolean;
  resetMessages(): void;
  resetTranslationHeight(): void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonReset({
  resetMessages,
  resetTranslationHeight,
  className,
}: ButtonResetProps) {
  const { t } = useTranslation(["form"]);

  const handleReset = () => {
    resetTranslationHeight();
    resetMessages();
  };
  return (
    <m.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="h-10 w-fit text-destructive"
            type="button"
            variant={"ghost"}
          >
            {t("reset.label")}
            <X size={18} className="ml-1 mt-1" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("reset.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("reset.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("reset.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>
              {t("reset.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </m.div>
  );
}

export default ButtonReset;
