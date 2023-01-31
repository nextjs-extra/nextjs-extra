import dynamic from "next/dynamic";
import { DC } from "@nextjs-extra/dynamic-components/DC";

export const Components = {
  Card: dynamic(() => import("./components/Card.dynamic.jsx"), {
    suspense: true,
  }),
};

export function DComponent({ type, props, children = null }) {
  return (
    <DC type={type} Components={Components} props={props}>
      {children}
    </DC>
  );
}
