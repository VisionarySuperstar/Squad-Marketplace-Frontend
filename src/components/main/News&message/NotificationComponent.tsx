import { useEffect } from "react";

const NotificationComponent: React.FC<{ title: string; body: string }> = ({
  title,
  body,
}) => {
  useEffect(() => {
    
    console.log("afdkslafjlsgjhflkdsjgldskjhglfdskjgklsdj");
  }, [title, body]);

  return null;
};

export default NotificationComponent;
