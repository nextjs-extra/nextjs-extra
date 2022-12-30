export default function Prompt({
  resolve,
  currentName,
}: {
  resolve: (name: string | undefined) => void;
  currentName: string | undefined;
}) {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    const name = input.value;

    resolve(name);
  }

  function clickOutside(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      resolve(undefined);
    }
  }

  return (
    <div className="Prompt" onClick={clickOutside}>
      <form onSubmit={onSubmit}>
        <input placeholder="Name" defaultValue={currentName} autoFocus />
        <button>Ok</button>
      </form>
    </div>
  );
}
