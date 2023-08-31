import { authUser } from "@/utils";
import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = new BlobServiceClient(
  `https://${import.meta.env.VITE_AZURE_STORAGE_ACCOUNT}.blob.core.windows.net${import.meta.env.VITE_AZURE_SAS_TOKEN}`
);
const containerClient = blobServiceClient.getContainerClient(import.meta.env.VITE_AZURE_STORAGE_CONTAINER);

export const uploadFile = async (file) => {
  const blockBlobClient = containerClient.getBlockBlobClient(
    `${authUser()?.name}/${new Date().toLocaleString()}/${file.name}`
  );
  await blockBlobClient.uploadBrowserData(file);
  return blockBlobClient.url;
};
