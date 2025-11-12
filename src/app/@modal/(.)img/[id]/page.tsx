import { Modal } from "./modal";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  // Stubbed modal while iterating on build errors. Restore FullPageImageView
  // once server-action conflicts are resolved.
  return (
    <Modal>
      <div className="p-8 text-white">Image modal placeholder: {photoId}</div>
    </Modal>
  );
}
