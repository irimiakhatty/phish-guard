import { createWorker } from 'tesseract.js';

/**
 * Extracts text from an image file using Tesseract.js (WASM) running in the browser.
 * @param imageFile The image file object from input
 * @returns Promise resolving to the extracted text string
 */
export async function extractTextFromImage(imageFile: File): Promise<string> {
    let worker = null;
    try {
        worker = await createWorker('eng', 1, {
            logger: m => { },
        });

        const result = await worker.recognize(imageFile);

        const text = result.data.text;

        await worker.terminate();
        return text;
    } catch (error) {
        console.error("OCR Error:", error);
        if (worker) {
            await worker.terminate();
        }
        throw new Error("Failed to extract text from image.");
    }
}
