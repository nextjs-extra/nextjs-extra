import { Suspense, createElement } from "react";

function expandJSX(content, Components): React.ReactNode {
  if (typeof content === "string") {
    return content;
  }
  if (!content) {
    return null;
  }
  if (!Array.isArray(content)) {
    return expandJSX([content], Components);
  }
  return (
    <>
      {content.map((item, i) => {
        if (item == null) {
          return null;
        }
        if (typeof item === "string") {
          return item;
        }
        return <DC key={i} {...item} Components={Components} />;
      })}
    </>
  );
}

function expandCreate(content, Components) {
  if (typeof content === "string") {
    return [content];
  }
  if (!Array.isArray(content)) {
    return expandCreate([content], Components);
  }
  return content.map((item) => {
    if (item == null) {
      return null;
    }
    if (typeof item === "string") {
      return item;
    }
    return createElement(DC, { ...item, Components });
  });
}

export function DC({
  type,
  props = {},
  Components,
  children = null,
}: {
  type: string;
  props?: Record<string, any>;
  Components: Record<string, React.ComponentType>;
  children?: React.ReactNode;
}) {
  if (!type) {
    if (props) {
      console.error("Mising type");
      console.debug({
        props,
      });
    }
    return null;
  }

  const Component = Components[type];

  if (Component) {
    if (props?.content) {
      const { content, ...newProps } = props;

      return (
        <Suspense fallback={null}>
          {
            // Type '{ children: ReactNode[]; }' has no properties in common with type 'IntrinsicAttributes'.ts(2559)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /* @ts-ignore  */
          }
          <Component {...newProps}>
            {children}
            {expandJSX(content, Components)}
          </Component>
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={null}>
          <Component {...props} />
        </Suspense>
      );
    }
  }

  if (type.match(/^[a-z]/)) {
    if (props?.content) {
      const { content, ...newProps } = props;
      const children = expandCreate(content, Components);
      return createElement(type, newProps, ...children);
    } else {
      return createElement(type, props);
    }
  }
  return <div data-component-name={type} />;
}
