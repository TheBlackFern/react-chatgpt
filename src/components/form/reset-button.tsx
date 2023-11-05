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

type ResetButtonProps = {
  submitted?: boolean;
  reset(): void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ResetButton({ reset, className }: ResetButtonProps) {
  const { t } = useTranslation(["form"]);

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
            data-testid="reset-button"
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
            <AlertDialogAction
              data-testid="reset-confirm-button"
              onClick={reset}
            >
              {t("reset.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </m.div>
  );
}

export default ResetButton;
