export default function NewPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-extrabold tracking-tight">New</h1>
      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 text-gray-700">
        <div className="font-semibold">Add this registry to Kasm</div>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
          <li>In Kasm, add a Workspace Registry using the root URL.</li>
          <li>Use the copy button on the Library page for the correct URL.</li>
        </ul>
      </div>
    </main>
  );
}
