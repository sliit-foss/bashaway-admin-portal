import { store } from "@/store";
import { storageApi } from "@/store/api";
import { BlobServiceClient } from "@azure/storage-blob";

export const uploadQuestion = async (questionName, file) => {
  const signedUrl = (
    await store
      .dispatch(
        storageApi.endpoints.signUrl.initiate({
          url: `https://${import.meta.env.VITE_AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
          upload: true
        })
      )
      .unwrap()
  )?.data?.signed_url;
  const blobServiceClient = new BlobServiceClient(signedUrl);
  const blockBlobClient = blobServiceClient
    .getContainerClient(import.meta.env.VITE_AZURE_STORAGE_CONTAINER)
    .getBlockBlobClient(`${questionName}/${new Date().toISOString()}/${file.name}`);
  await blockBlobClient.uploadBrowserData(file);
  return blockBlobClient.url;
};
