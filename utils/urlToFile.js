export async function URLTOFILE(imageArray) {
    const files = [];
    for (const imageUrl of imageArray) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const fileName = imageUrl.split('/').pop(); // Extract the file name from the URL
            const file = new File([blob], fileName, { type: blob.type });
            files.push(file);
        } catch (error) {
            console.error(`Error downloading image from ${imageUrl}:`, error);
        }
    }
    return files;
}
