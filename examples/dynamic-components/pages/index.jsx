import { DComponent } from "../Components";

export default function Home({ elements }) {
  return (
    <main>
      {elements.map((element, index) => (
        <DComponent key={index} type={element.type} props={element.props} />
      ))}
    </main>
  );
}

export function getStaticProps() {
  return {
    props: {
      elements: [
        {
          type: "Card",
          props: {
            title: "Hello",
            children: "World",
          },
        },
        {
          type: "p",
          props: {
            children: "This is a paragraph",
          },
        },
        {
          type: "div",
          props: {
            content: [
              {
                type: "p",
                props: {
                  children: "This is a paragraph inside a div",
                },
              },
              {
                type: "Card",
                props: {
                  title: "Card",
                  children: "This is a card inside a div",
                },
              },
            ],
          },
        },
      ],
    },
  };
}
