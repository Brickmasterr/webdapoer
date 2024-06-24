const fs = require('fs');
const path = require('path');

exports.getYouTubeVideoId = function (url) {
    // Regular expression to match YouTube video ID in various URL formats
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    // Extract video ID from matched groups
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}

exports.checkIfMp3Exists = function(folderPath, fileName) {
    const filePath = path.join(folderPath, fileName);
    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Check if the file is an MP3 file
            if (fileName.endsWith('.mp3')) {
                return true;
            } else {
                console.log('File exists but is not an MP3 file.');
                return false;
            }
        } else {
            console.log('File does not exist.');
            return false;
        }
    } catch (error) {
        console.error('Error checking file existence:', error);
        return false;
    }
}