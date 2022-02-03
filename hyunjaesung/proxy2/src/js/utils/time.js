export const getLeftTime = (endTime) => {
  return Math.ceil((endTime - Date.now()) / 1000);
};
