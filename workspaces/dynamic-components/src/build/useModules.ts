function getName(path) {
  return path.replace(/[/.@]/g, "ー");
}

function isAModule(driver) {
  try {
    require.resolve(driver);
    return true;
  } catch (e) {
    return false;
  }
}

export function useModules(modules) {
  let string = "";

  for (const path of modules) {
    if (!isAModule(path)) {
      continue;
    }
    string = `${string}\n  ${getName(
      path
    )}: dynamic(() => import("${path}"), { suspense: true }),`;
  }

  return string;
}
