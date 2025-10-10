export function errorMessage(varError: unknown): string {
  if (varError instanceof Error) return varError.message;
  if (typeof varError === "string") return varError;
  if (typeof varError === "number") return `Codigo de error: ${varError}`;
  if (typeof varError === "boolean")
    return varError ? "Error verdadero" : "Error falso";
  return "Error desconocido";
}
