export default function Logs() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Activity Logs 🧾</h1>

      <table className="mt-4 w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th>Time</th>
            <th>Event</th>
            <th>Severity</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>10:22</td>
            <td>Login Failure</td>
            <td className="text-red-500">High</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}