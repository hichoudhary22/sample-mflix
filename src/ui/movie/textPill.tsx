export default function TextPill({ text }: { text: string }) {
  return (
    <p className="mx-1 inline-flex rounded-full border px-3 py-1 text-sm">
      {text}
    </p>
  );
}
