import { useState } from "react";
import { asyncit } from "@nextjs-extra/async-component";

import Prompt from "../components/Prompt";
import Toast from "../components/Toast";

export default function Home() {
  const [name, setName] = useState("");

  async function promptAndSetName() {
    // If you want to render a component, and use the response from it, you can use await asyncit.
    const newName = await asyncit(Prompt, {
      uniqueKey: "name prompt",
      currentName: name,
    });

    if (newName === undefined) {
      // if you just want to render a component, and you don't care about the response, you can use asyncit without await.
      asyncit(
        Toast,
        {
          message: `Name not set`,
          style: { background: "orange", color: "white" },
          timeout: 9000,
        },
        "footer"
      );
      return;
    }

    setName(newName);

    asyncit(
      Toast,
      {
        message: newName ? `Name set to ${newName}` : "Name cleared",
        style: { background: "lightgreen" },
      },
      "footer" // you can also specify a container to render the component in
    );
  }

  return (
    <main>
      <h1>Hello {name}</h1>
      <button onClick={promptAndSetName}>set your name</button>
    </main>
  );
}
