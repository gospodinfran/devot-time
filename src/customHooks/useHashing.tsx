async function sha1(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const buffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

export async function useHashing(password: string) {
  const data = await sha1(password);
  const salt = '4,;aW-(4+#1q:=c7';
  const hash = `${salt}${data}`;
  return hash;
}
