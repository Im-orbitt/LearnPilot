import "./Avatar.css";

function Avatar({ name = "" }) {
  const initial = name.trim().charAt(0).toUpperCase();

  if (!initial) {
    return <div className="avatar">?</div>;
  }

  return <div className="avatar">{initial}</div>;
}

export default Avatar;
