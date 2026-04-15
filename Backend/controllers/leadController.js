import Lead from "../models/Lead.js";

export const getLeads = async (req, res) => {

    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json(leads);

};