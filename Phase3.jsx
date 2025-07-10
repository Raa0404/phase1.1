
import React from 'react';

export default function Phase3({ accountData, onBack, onFinish }) {
  if (!accountData || accountData.length === 0) {
    return (
      <div className="p-6 bg-orange-100 min-h-screen text-center">
        <h2 className="text-xl font-bold text-orange-800">No data found for this account</h2>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700"
        >
          Back
        </button>
      </div>
    );
  }

  const { cifId, npaDate, npaCategory } = accountData[0];
  const numberOfAccounts = accountData.length;

  return (
    <div className="p-6 bg-orange-50 min-h-screen text-orange-900">
      <h1 className="text-3xl font-bold mb-4 text-orange-700">OTS NIVARAN - Phase 3</h1>

      <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
        <p className="text-lg font-semibold">CIF ID: {cifId}</p>
        <p className="text-lg">Number of Accounts: {numberOfAccounts}</p>
        <p className="text-lg">NPA Date: {npaDate}</p>
        <p className="text-lg">NPA Category: {npaCategory}</p>
      </div>

      {accountData.map((account, index) => (
        <div key={index} className="bg-orange-100 p-4 rounded-2xl mb-4 shadow">
          <p><span className="font-semibold">Account No:</span> {account.accountNumber}</p>
          <p><span className="font-semibold">CIF CURRENT O/S:</span> {account.cifCurrentOS}</p>
          <p><span className="font-semibold">CIF PRINCIPAL O/S:</span> {account.cifPrincipalOS}</p>
          <p><span className="font-semibold">Notional Dues:</span> {account.notionalDues}</p>
          <p><span className="font-semibold">Write-Off:</span> {account.writeOff}</p>
          <p><span className="font-semibold">Waiver:</span> {account.waiver}</p>
          <p><span className="font-semibold">Sacrifice:</span> {account.sacrifice}</p>
          <p><span className="font-semibold">Minimum Settlement Amt:</span> {account.minimumSettlement}</p>
        </div>
      ))}

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700"
        >
          Back
        </button>
        <button
          onClick={onFinish}
          className="px-6 py-2 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700"
        >
          Finish
        </button>
      </div>

      <footer className="mt-12 text-right text-orange-600 font-bold">
        © P.Raa
      </footer>
    </div>
  );
}
