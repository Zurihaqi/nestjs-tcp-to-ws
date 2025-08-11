export function parseTcpData(data: Buffer) {
  return {
    raw: data.toString(),
    length: data.length,
    timestamp: Date.now()
  };
}
