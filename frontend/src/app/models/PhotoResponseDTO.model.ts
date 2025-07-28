export interface PhotoResponseDTO {
  id: number;
  name: string;
  type: string;
  data: string;  // Base64-encoded image
  base64Data?: string;
}






