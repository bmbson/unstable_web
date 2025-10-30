export function extractAfterLastSlashUrl(url: string | undefined) {
    if (url != undefined) {
        return  url.split('/').pop();
    }
}