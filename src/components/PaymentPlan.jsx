import React from "react";
import { Plus, Trash2 } from "lucide-react";

const PaymentPlan = ({ payment, setPayment }) => {
  const addInstallment = () => {
    setPayment({
      ...payment,
      installments: [
        ...payment.installments,
        { id: payment.installments.length + 1, amount: "", dueDate: "" },
      ],
    });
  };

  const removeInstallment = (id) => {
    setPayment({
      ...payment,
      installments: payment.installments.filter((inst) => inst.id !== id),
    });
  };

  const updateInstallment = (id, field, value) => {
    setPayment({
      ...payment,
      installments: payment.installments.map((inst) =>
        inst.id === id ? { ...inst, [field]: value } : inst
      ),
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Payment <span className="text-purple-600">Plan</span>
      </h2>
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Amount
            </label>
            <input
              type="text"
              value={payment.totalAmount}
              onChange={(e) =>
                setPayment({ ...payment, totalAmount: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg text-lg font-bold"
              placeholder="₹ 90,000"
            />
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              TCS
            </label>
            <input
              type="text"
              value={payment.tcs}
              onChange={(e) => setPayment({ ...payment, tcs: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Not Collected"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mb-3">Installments</h3>
        <div className="bg-purple-900 text-white grid grid-cols-3 gap-4 p-4 rounded-t-lg font-bold">
          <div>Installment</div>
          <div>Amount</div>
          <div>Due Date</div>
        </div>
        {payment.installments.map((inst, index) => (
          <div
            key={inst.id}
            className="grid grid-cols-3 gap-4 p-4 bg-purple-50 border-b border-purple-100 items-center"
          >
            <div className="font-semibold">Installment {index + 1}</div>
            <input
              type="text"
              value={inst.amount}
              onChange={(e) =>
                updateInstallment(inst.id, "amount", e.target.value)
              }
              className="p-2 border border-gray-300 rounded"
              placeholder="₹50,000"
            />
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={inst.dueDate}
                onChange={(e) =>
                  updateInstallment(inst.id, "dueDate", e.target.value)
                }
                className="flex-1 p-2 border border-gray-300 rounded"
                placeholder="Initial Payment"
              />
              {payment.installments.length > 1 && (
                <button
                  onClick={() => removeInstallment(inst.id)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={addInstallment}
          className="mt-4 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          <Plus size={20} />
          Add Installment
        </button>
      </div>
    </div>
  );
};

export default PaymentPlan;
