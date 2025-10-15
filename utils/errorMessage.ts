export function errorMessage(varError: unknown): string {
  if (varError instanceof Error) {
    return varError.message;
  }

  if (
    typeof varError === "object" &&
    varError !== null &&
    "message" in varError &&
    typeof varError.message === "string"
  ) {
    return varError.message;
  }

  if (typeof varError === "string") {
    return varError || "Error desconocido";
  }

  if (typeof varError === "number") {
    return `Código de error: ${varError}`;
  }

  if (varError === null) return "Error: valor nulo";
  if (varError === undefined) return "Error: valor indefinido";

  try {
    const stringified = JSON.stringify(varError);
    return `Error: ${stringified}`;
  } catch {
    return "Error desconocido";
  }
}
