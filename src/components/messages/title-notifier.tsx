import React from "react";

type TitleNotifierProps = {
  notificationTitle: string;
};

const TitleNotifier = ({ notificationTitle }: TitleNotifierProps) => {
  let mainTitle = React.useRef(notificationTitle);
  let id = React.useRef<number | null>(null);

  React.useEffect(() => {
    changeTitle();
    return () => {
      if (document.title === notificationTitle) {
        document.title = mainTitle.current;
      }
      if (id.current) window.clearTimeout(id.current);
    };
  }, []);

  function changeTitle() {
    if (document.title !== notificationTitle) {
      mainTitle.current = document.title;
      document.title = notificationTitle;
    } else {
      document.title = mainTitle.current;
    }
    id.current = window.setTimeout(changeTitle, 500);
  }

  return null;
};

export default TitleNotifier;
