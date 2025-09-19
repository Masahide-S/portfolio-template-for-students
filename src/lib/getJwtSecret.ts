let cachedSecret: Uint8Array | null = null;

export async function getJwtSecret(): Promise<Uint8Array> {
  if (cachedSecret) {
    return cachedSecret;
  }

  const secretKey = process.env.JWT_KEY;
  
  if (!secretKey) {
    console.error("JWT_KEY environment variable is not set. Please check Amplify environment variables.");
    throw new Error("JWT_KEY environment variable is not set");
  }

  if (secretKey.length < 32) {
    console.warn("JWT_KEY should be at least 32 characters for security");
  }

  cachedSecret = new TextEncoder().encode(secretKey);
  return cachedSecret;
}