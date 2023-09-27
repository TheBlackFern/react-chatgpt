function useTitlenotification(notificationTitle: string, interval = 500) {
  let mainTitle = notificationTitle;
  let id: number;

  React.useEffect(() => {
    changeTitle();
    return () => {
      if (document.title === notificationTitle) {
        document.title = mainTitle;
      }
      if (id) window.clearTimeout(id);
    };
  }, []);

  function changeTitle() {
    if (document.title !== notificationTitle) {
      mainTitle = document.title;
      document.title = notificationTitle;
    } else {
      document.title = mainTitle;
    }
    id = window.setTimeout(changeTitle, interval);
  }
}
