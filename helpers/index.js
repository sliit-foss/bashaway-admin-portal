export const downloadFile = (url) => {
    url = `/api/proxy?uri=${encodeURIComponent(url)}`
    const temporaryDownloadLink = document.createElement("a");
    temporaryDownloadLink.style.display = 'none';

    document.body.appendChild(temporaryDownloadLink);
    temporaryDownloadLink.setAttribute('href', url);
    temporaryDownloadLink.setAttribute('download', "");

    temporaryDownloadLink.click();

    document.body.removeChild(temporaryDownloadLink);
}