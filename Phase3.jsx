// Phase 3 component (from canvas)
import React from "react";
import { Button } from "@/components/ui/button";

export default function Phase3({ data, onBack }) {
  if (!data || data.length === 0) return <div className="p-4">No data found.</div>;

  const { "CIF ID": cifId, "Number of Accounts": noOfAccounts, "NPA Category": npaCategory } = data[0];

  return (
    <div className="p-4 bg-orange-100 min-h-screen">
      <div className="text-right text-sm font-semibold text-red-600">© P.Raa</div>

      <h2 className="text-xl font-bold text-orange-700 mb-4">Phase 3: Account Settlement Details</h2>

      <div className="mb-4 p-3 bg-orange-200 rounded shadow">
        <p className="font-semibold">CIF ID: <span className="font-normal">{cifId}</span></p>
        <p className="font-semibold">Number of Accounts: <span className="font-normal">{noOfAccounts}</span></p>
        <p className="font-semibold">NPA Category: <span className="font-normal">{npaCategory}</span></p>
      </div>

      <div className="space-y-2">
        {data.map((acc, idx) => (
          <div key={idx} className="bg-white rounded p-3 shadow text-sm">
            <p>
              <strong>{acc["Account Number"]}</strong> | {acc["Borrower Name"]} | {acc["NPA Date"]?.toString().slice(0, 10)} | ₹{acc["CIF Outstanding"]} O/S | ₹{acc["Principal O/S"]} Principal | ₹{acc["Notional Dues"]} Dues | ₹{acc["Minimum Settlement"]} Min Settlement | ₹{acc["Write-Off"]} Write-Off | ₹{acc["Waiver"]} Waiver | ₹{acc["Sacrifice"]} Sacrifice
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">Finish</Button>
      </div>
    </div>
  );
}
