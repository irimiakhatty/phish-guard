export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  // Stubbed image page while we iterate on server-action export issues.
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 overflow-y-hidden">
      <div className="m-auto p-8 text-center">Image page placeholder: {photoId}</div>
    </div>
  );
}
