import { useState } from "react";

export default function Tab({ render }) {
  const [tabState, setTabState] = useState(false);
  return (
    <div className="px-3 py-2">
      <h4 className="text-h4 ">Test</h4>
    </div>
  );
}
