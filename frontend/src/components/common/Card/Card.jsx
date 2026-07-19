const Card = ({
  title,
  children,
}) => {
  return (
    <div className="rounded-xl bg-white shadow-sm border p-6">
      {title && (
        <h2 className="mb-6 text-xl font-semibold">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
};

export default Card;