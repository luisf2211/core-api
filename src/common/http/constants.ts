export const AUTH_HEADER = {
    name: 'Token',
    description: 'Token de autenticación codificado a base64 (ClientID:ClientSecret)',
    required: true,
}

export const BEARER_HEADER = {
    name: 'Bearer',
    required: true,
}