import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = new BlobServiceClient(
  import.meta.env.VITE_BLOB_SAS_URL
);
const containerClient = blobServiceClient.getContainerClient("bashaway-prod");

export const uploadFile = async (file) => {
  const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  return blockBlobClient.uploadBrowserData(file);
};
