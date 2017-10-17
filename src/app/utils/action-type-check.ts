const typeCache: { [label: string]: boolean } = {};

/**
 * 
 * @param label is an @ngrx action
 * which is stored in typeCache
 */
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is already in use!`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}