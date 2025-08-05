export const AUTH_ERROR_MESSAGES = [
  'Token inválido ou expirado',
  'Token não fornecido'
];

export const isAuthError = (status: number, message?: string): boolean => {
  return status === 403 || (!!message && AUTH_ERROR_MESSAGES.includes(message));
};
