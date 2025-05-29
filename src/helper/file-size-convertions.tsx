export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);

  // Deixa com 2 casas decimais se for diferente de "Bytes"
  const formattedValue = i === 0 ? value : value.toFixed(2);

  return `${formattedValue} ${sizes[i]}`;
}
