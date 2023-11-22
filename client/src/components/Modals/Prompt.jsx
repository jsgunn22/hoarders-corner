import Button from "../Atoms/Button";

export default function Prompt({
  heading,
  body,
  priLabel,
  secLabel,
  priStyle,
  secStyle,
  priAction,
  secAction,
}) {
  return (
    <div className="bg-[#00000080] w-screen h-screen absolute top-0 left-0 flex items-center">
      <div className="bg-neu-0 w-[560px] p-8 mx-auto rounded-lg flex flex-col gap-6">
        <h2 className="text-h2 font-bold w-full">{heading}</h2>
        {body}
        <div className="flex gap-4 w-full justify-end">
          <Button label={secLabel} style={secStyle} action={secAction} />
          <Button label={priLabel} style={priStyle} action={priAction} />
        </div>
      </div>
    </div>
  );
}
