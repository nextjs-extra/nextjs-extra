export function waitAndCallFactory(fn: () => Promise<any>) {
  let updating;
  return function waitAndCall() {
    if (updating) {
      updating = updating.then(() => {
        updating = fn();
        return updating;
      });
      return updating;
    }
    updating = fn();
    return updating;
  };
}
