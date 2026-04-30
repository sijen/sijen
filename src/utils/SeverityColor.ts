export const severityColor = (level: string) => {
  switch (level) {
    case "CRITICAL":
      return "text-red-500";
    case "HIGH":
      return "text-orange-400";
    case "MEDIUM":
      return "text-yellow-400";
    case "LOW":
      return "text-green-400";
    default:
      return "text-gray-400";
  }
};