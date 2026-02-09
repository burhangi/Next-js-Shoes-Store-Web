// lib/utils/demo.ts
export const generateDemoToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

export const isValidDemoToken = (token: string): boolean => {
  return token.length === 32 && /^[A-Za-z0-9]+$/.test(token)
}