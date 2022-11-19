export const GenerateWorkflowId = (userID: string): string => {
  return `${userID}/${Date.now()}`;
};
