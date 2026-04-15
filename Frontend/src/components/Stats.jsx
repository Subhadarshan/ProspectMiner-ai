export default function Stats({ leads }) {
  
  const high = leads.filter((l) => l.leadScore === "High").length;
  const medium = leads.filter((l) => l.leadScore === "Medium").length;
  const low = leads.filter((l) => l.leadScore === "Low").length;

  return (
    <div className="card p-3 mb-3 shadow-sm">
      <div className="row text-center">
        <div className="col-4 col-md order-1 order-md-4 text-warning">
          <b>Low:</b> {low}
        </div>
        <div className="col-4 col-md order-2 order-md-3 text-success">
          <b>Medium:</b> {medium}
        </div>
        <div className="col-4 col-md order-3 order-md-2 text-danger">
          <b>High:</b> {high}
        </div>

        <div className="col-12 col-md order-4 order-md-1 text-primary mt-2 mt-md-0">
          <b>Total Leads:</b> {leads.length}
        </div>
      </div>
    </div>
  );
}