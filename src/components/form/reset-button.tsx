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
import { TMessage } from "@/lib/types";
import { useTranslation } from "react-i18next";

type ButtonResetProps = {
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonReset({ setMessages, className }: ButtonResetProps) {
  const { t } = useTranslation(["form"]);

  const handleReset = () => {
    setMessages([]);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" className={className}>
          {t("reset.label")}
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
  );
}

export default ButtonReset;
