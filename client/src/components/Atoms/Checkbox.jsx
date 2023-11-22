export default function Checkbox({ label, id, checked, onChange, name }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 mr-1 cursor-pointer"
        name={name}
      />
      <label form={id}>{label}</label>
    </div>
  );
}
