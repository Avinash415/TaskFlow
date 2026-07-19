import Button from "../Button/Button";

const PageHeader = ({
  title,
  buttonText,
  onClick,
}) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {buttonText && (
        <Button onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;