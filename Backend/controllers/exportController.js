import ExcelJS from "exceljs";

import Lead from "../models/Lead.js";

export const exportLeads = async (req, res) => {
    try {
        const jobId = req.params.id;

        const leads = await Lead.find({ jobId: Number(jobId) });

        if (!leads.length) {
            return res.status(404).json({ message: "No data found" });
        }

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Leads");

        sheet.columns = [
            { header: "S.No.", key: "sno", width: 10 },
            { header: "Name", key: "name", width: 25 },
            { header: "Category", key: "category", width: 20 },
            { header: "Address", key: "address", width: 30 },
            { header: "Rating", key: "rating", width: 10 },
            { header: "Phone", key: "phone", width: 20 },
            { header: "Website", key: "website", width: 25 },
            { header: "Email", key: "email", width: 25 },
            { header: "Lead Score", key: "leadScore", width: 15 },
        ];

        const headerRow = sheet.getRow(1);

        headerRow.eachCell((cell) => {
            cell.font = { bold: true };

            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFF00" }
            };

            cell.alignment = { vertical: "middle", horizontal: "center" };

            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };
        });

        const formatValue = (val) => val && val.trim() !== "" ? val : "Not Provided";

        leads.forEach((lead, index) => {
            const detailRow = sheet.addRow({
                sno: index + 1,
                name: formatValue(lead.name),
                category: formatValue(lead.category),
                address: formatValue(lead.address),
                rating: formatValue(lead.rating),
                phone: formatValue(lead.phone),
                website: formatValue(lead.website),
                email: formatValue(lead.email),
                leadScore: formatValue(lead.leadScore),
            });

            detailRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
            });
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=job_${jobId}_leads.xlsx`
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).json({ error: "Export failed" });
    }
};