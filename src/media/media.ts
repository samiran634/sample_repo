/**
 * Media Service
 * Handles media file operations, validation, and URL generation
 */

export interface MediaFile {
    id: string;
    filename: string;
    mimetype: string;
    size: number;
    url: string;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validate a media file before processing
 * @param file The file object to validate
 */
export const validateMediaFile = (file: { mimetype: string; size: number }): boolean => {
    console.log(`Validating file: ${file.mimetype} (${file.size} bytes)`);
    
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        console.error(`Invalid mime type: ${file.mimetype}`);
        return false;
    }

    if (file.size > MAX_FILE_SIZE) {
        console.error(`File too large: ${file.size} > ${MAX_FILE_SIZE}`);
        return false;
    }

    return true;
};

/**
 * Simulate uploading a file to storage (e.g., S3, Cloudinary)
 * @param filename Original filename
 * @param size File size in bytes
 */
export const uploadMedia = async (filename: string, size: number): Promise<MediaFile> => {
    console.log(`Uploading ${filename}...`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const id = `media_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const ext = filename.split('.').pop() || 'bin';
    
    // Mock response
    return {
        id,
        filename,
        mimetype: getMimeType(filename),
        size: size,
        url: `https://cdn.example.com/assets/${id}.${ext}`
    };
};

/**
 * Get a signed URL for a private media asset
 * @param mediaId The ID of the media
 */
export const getSignedUrl = (mediaId: string): string => {
    const signature = Math.random().toString(36).substring(7);
    const expiry = Date.now() + 3600000; // 1 hour
    return `https://cdn.example.com/private/${mediaId}?sig=${signature}&exp=${expiry}`;
};

/**
 * Helper to guess mime type from filename
 */
const getMimeType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'jpg':
        case 'jpeg': return 'image/jpeg';
        case 'png': return 'image/png';
        case 'gif': return 'image/gif';
        case 'pdf': return 'application/pdf';
        default: return 'application/octet-stream';
    }
};
