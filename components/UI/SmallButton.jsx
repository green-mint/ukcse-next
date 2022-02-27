function SmallButton({ className, text, onClick }) {
  return (
    <div className={className}>
      <div
        onClick={onClick}
        className="p-1 px-4 cursor-pointer select-none rounded-md bg-btn-bg hover:bg-btn-bg-hover text-btn-text"
      >
        {text}
      </div>
    </div>
  );
}

export default SmallButton;
