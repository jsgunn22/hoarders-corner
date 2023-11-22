export default function Button({ label, action, type, icon, style }) {
  const classList = `  rounded  px-4  py-3  h-10  cursor-pointer   text-h4  font-medium  ${style}  hover:text-neu-0 ${
    style === "warning"
      ? "bg-opac-war text-war-9 hover:bg-war-9 active:bg-war-9"
      : style === "danger"
      ? "bg-opac-dan text-dan-5 hover:bg-dan-5 active:bg-dan-9"
      : "bg-opac-pri text-pri-5 hover:bg-pri-3 active:bg-pri-9"
  }`;
  return (
    <button className={classList} onClick={action} type={type}>
      {icon && <i className={`${label && "mr-2"} ${icon}`}></i>}
      {label}
    </button>
  );
}
