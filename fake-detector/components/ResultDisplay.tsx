type ResultDisplayProps = {
  isAI: boolean | null;
  confidence: number | null;
  error: string | null;
};

export default function ResultDisplay({
  isAI,
  confidence,
  error,
}: ResultDisplayProps) {
  if (error) {
    return (
      <div
        className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (isAI === null || confidence === null) {
    return null;
  }

  return (
    <div
      className="mt-4 p-4 bg-black-100 rounded-lg"
      role="region"
      aria-label="AI Detection Result"
    >
      <h2 className="text-xl font-bold mb-2">Result:</h2>
      <p className={`text-lg ${isAI ? "text-red-500" : "text-green-500"}`}>
        This media is {isAI ? "likely" : "unlikely"} to be AI-generated.
      </p>
      <p className="text-md mt-2">
        Confidence: {(confidence * 100).toFixed(2)}%
      </p>
      <p className="text-sm mt-2 text-gray-600">
        {isAI
          ? "This result suggests the content may be AI-generated. However, please note that this is not definitive and further verification may be needed."
          : "While this content appears to be human-generated, AI detection is not perfect. Always use critical thinking when evaluating media."}
      </p>
    </div>
  );
}
