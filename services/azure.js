import { BlobServiceClient } from '@azure/storage-blob'

const blobServiceClient = new BlobServiceClient(`https://${process.env.NEXT_PUBLIC_STORAGE_ACCOUNT}.blob.core.windows.net${process.env.NEXT_PUBLIC_SAS_TOKEN}`)
const containerClient = blobServiceClient.getContainerClient(`questions-${process.env.NEXT_PUBLIC_APP_ENV}`)

export const uploadFile = async (questionName, file) => {
  const blockBlobClient = containerClient.getBlockBlobClient(`${questionName}/${Date.now().toLocaleString()}/${file.name}`)
  await blockBlobClient.uploadBrowserData(file)
  return blockBlobClient.url
}
