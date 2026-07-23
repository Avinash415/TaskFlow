import Button from "../Button/Button";

const PageHeader = ({
  title,
  subtitle,
  buttonText,
  onClick,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        )}

      </div>

      {buttonText && (
        <Button
          onClick={onClick}
          className="w-full md:w-auto"
        >
          {buttonText}
        </Button>
      )}

    </div>
  );
};

export default PageHeader;