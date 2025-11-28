import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// TODO: Implement file upload for PhishGuard (email attachments, screenshots)
export const ourFileRouter = {
  // imageUploader: f({ image: { maxFileSize: "4MB" } })
  //   .middleware(async () => {
  //     return { userId: "temp" };
  //   })
  //   .onUploadComplete(async () => {
  //     return { uploadedBy: "temp" };
  //   }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
