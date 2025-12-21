export default function Workspace({ workspace }) {
  return (
    <div className="card">
      <div className="title">{workspace.friendly_name}</div>
      <div className="meta">{workspace.description}</div>
    </div>
  );
}
