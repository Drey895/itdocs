import { use } from "react";

export function Packer({ Delegate, packPromise }) {
  const pack = use(packPromise);
  return pack.map((obj) => <Delegate key={obj.id} data={obj} />);
}
