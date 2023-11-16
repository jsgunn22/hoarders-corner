export default function Button(props) {
  const classList = `${"bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 "} ${
    props.style
  }`;
  return (
    <button className={classList} onClick={props.action} type={props.type}>
      <i className={`mr-2 ${props.icon}`}></i>
      {props.label}
    </button>
  );
}
