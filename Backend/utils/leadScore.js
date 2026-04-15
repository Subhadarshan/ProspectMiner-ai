export const calculateLeadScore = (lead) => {

  let score = 0;

  if (lead.website) score += 2;

  if (lead.phone) score += 2;

  if (lead.rating) score += 1;

  if (score >= 4) return "High";

  if (score >= 2) return "Medium";

  return "Low";
};