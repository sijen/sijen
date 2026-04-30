export default function IPTracker() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">IP Monitoring 🌐</h1>

      <div className="mt-4 bg-gray-800 p-4 rounded">
        <p>192.168.1.10 — Suspicious</p>
        <p>45.33.21.10 — High Risk</p>
        <p>8.8.8.8 — Safe</p>
      </div>
    </div>
  );
}