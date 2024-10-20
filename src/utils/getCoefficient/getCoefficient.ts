import type { ISubject } from "@interfaces";

export const getCoefficient = (academicHistory: Array<ISubject>) => {
  let qty = 0;
  const sum = academicHistory.reduce((acc, { grade }) => {
    if (typeof grade === "number") {
      qty++;
      return acc + grade;
    }
    return acc;
  }, 0);
  return Number.parseFloat((sum / qty).toFixed(2));
};
