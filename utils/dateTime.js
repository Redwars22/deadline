export default function getDate() {
  const date = new Date();
  return `${date.toLocaleDateString("pt-BR")} ${date.toLocaleTimeString()}`;
}
