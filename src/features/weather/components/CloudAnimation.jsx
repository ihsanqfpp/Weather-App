import { memo } from "react";

function CloudAnimation({ show }) {
  if (!show) return null;

  return (
    <div className="clouds">
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
    </div>
  );
}

export default memo(CloudAnimation);
