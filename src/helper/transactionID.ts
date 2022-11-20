export const GenerateWorkflowId = (userID: string): string => {
  return `TRX/${userID}/${Date.now()}`;
};
