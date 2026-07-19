const TextArea = ({
  label,
  error,
  registration,
  rows = 4,
}) => {
  return (
    <div className="space-y-1">
      <label className="font-medium">
        {label}
      </label>

      <textarea
        rows={rows}
        {...registration}
        className="
        w-full
        rounded-lg
        border
        border-gray-300
        px-4
        py-3
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        outline-none"
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;