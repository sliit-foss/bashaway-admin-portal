import { storageApi } from "@/store/api";
import { authUser } from "@/utils";
import { BlobServiceClient } from "@azure/storage-blob";
import { store } from "@/store";

export const uploadFile = async (file) => {
  const signedUrl = (await (store.dispatch(storageApi.endpoints.signUrl.initiate({ url: `https://${import.meta.env.VITE_AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`, upload: true })).unwrap()))?.data?.signed_url;
  const blobServiceClient = new BlobServiceClient(signedUrl);
  const blockBlobClient = blobServiceClient.getContainerClient(import.meta.env.VITE_AZURE_STORAGE_CONTAINER).getBlockBlobClient(
    `${authUser()?.name}/${new Date().toISOString()}/${file.name}`
  );
  await blockBlobClient.uploadBrowserData(file);
  return blockBlobClient.url;
};
