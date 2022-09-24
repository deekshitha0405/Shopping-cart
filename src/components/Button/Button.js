import "./Button.css";

export default function Button({ btnName, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {btnName}
    </button>
  );
}
