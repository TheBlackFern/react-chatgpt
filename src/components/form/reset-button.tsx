import { m } from "framer-motion";
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
  submitted?: boolean;
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>;
  setTranslationHeight: React.Dispatch<React.SetStateAction<number>>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonReset({
  setMessages,
  setTranslationHeight,

  className,
}: ButtonResetProps) {
  const { t } = useTranslation(["form"]);

  const handleReset = () => {
    setTranslationHeight(0);
    setMessages([]);
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
          <Button type="button" variant="destructive">
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
    </m.div>
  );
}

export default ButtonReset;
