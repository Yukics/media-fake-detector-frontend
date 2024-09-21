

export default function ResultDisplay(props) {
  // if (error) {
  //   return (
  //     <div
  //       className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
  //       role="alert"
  //     >
  //       <strong className="font-bold">Error: </strong>
  //       <span className="block sm:inline">{error}</span>
  //     </div>
  //   );
  // }

  // if (isAI === null || confidence === null) {
  //   return null;
  // }

  return (
    <div
      className="mt-4 p-4 bg-black-100 rounded-lg"
      role="region"
      aria-label="AI Detection Result"
    >
      <h2 className="text-xl font-bold mb-2">Result:</h2>
      <p>{props?.hash}</p>

    </div>
  );
}
