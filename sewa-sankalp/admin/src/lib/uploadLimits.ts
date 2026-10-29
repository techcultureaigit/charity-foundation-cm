/** Vercel serverless request body cap — keep UX message in sync with API. */
export const MAX_UPLOAD_BYTES = Math.floor(4.5 * 1024 * 1024);
export const MAX_UPLOAD_LABEL = "4.5 MB";
export const MAX_UPLOAD_MESSAGE = "Please upload below than 4.5 MB.";

export function validateUploadSize(file: File): string | null {
  if (file.size > MAX_UPLOAD_BYTES) return MAX_UPLOAD_MESSAGE;
  return null;
}
