import { useEffect } from "react";

export default function Toast({
  resolve,
  message,
  style,
  timeout = 3000,
}: {
  resolve: () => void;
  message: string;
  style: React.CSSProperties;
  timeout?: number;
}) {
  useEffect(() => {
    const closeTimeout = setTimeout(resolve, timeout);

    return () => clearTimeout(closeTimeout);
  }, [timeout]);

  return (
    <div className="Toast" style={style} onClick={resolve}>
      {message}
    </div>
  );
}
