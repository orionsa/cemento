
export const generateSummary = (input, keysToSummarize)=> {
  const summary = {};

  input.forEach((item) => {
    keysToSummarize.forEach((key) => {
      const value = item[key];

      if (!summary[key]) {
        summary[key] = {};
      }

      if (!summary[key][value]) {
        summary[key][value] = 1;
      } else {
        summary[key][value]++;
      }
    });
  });

  return summary;
}