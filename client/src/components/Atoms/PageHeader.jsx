import Button from "./Botton";

export default function PageHeader({
  icon,
  label,
  hasButton,
  btnLabel,
  btnAction,
}) {
  return (
    <div className="flex">
      <div className="flex items-center mb-6 mr-auto">
        <i className={`${icon} text-pri-5 text-h3 mr-2`}></i>
        <h3 className="text-h3 font-bold">{label}</h3>
      </div>
      {/* hasButton is a Boolean.  If false the button will not be rendered */}
      {hasButton && <Button label={btnLabel} action={btnAction} />}
    </div>
  );
}
