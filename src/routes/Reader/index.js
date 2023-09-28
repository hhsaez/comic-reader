export { default } from "./Reader";

export function readerLoader(data) {
  const { params } = data;
  const { id, chapter } = params;
  return { id, chapter: Number.parseInt(chapter) };
}