import React from "react";

interface TransactionDetail {
  id: number;
  quantity: string;
  price: string;
  amount: string;
  product: {
    id: number;
    product_name: string;
    description: string;
  };
  uom: {
    id: number;
    name: string;
    rate_conversion: string;
  };
}

interface TransactionDetailTableProps {
  details: TransactionDetail[];
  taxRate: string;
}

const TransactionDetailTable: React.FC<TransactionDetailTableProps> = ({
  details,
  taxRate,
}) => {
  // Konversi taxRate ke float
  const taxRateFloat = parseFloat(taxRate);

  // Hitung subtotal dari amount (tanpa pajak)
  const subtotal = details.reduce(
    (acc, detail) => acc + parseFloat(detail.amount),
    0
  );

  // Hitung pajak
  const taxAmount = subtotal * taxRateFloat;

  // Hitung grand total
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Description</th>
            <th>UOM</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={detail.id}>
              <td>{index + 1}</td>
              <td>{detail.product.product_name}</td>
              <td>{detail.product.description}</td>
              <td>{detail.uom.name}</td>
              <td>{parseFloat(detail.quantity).toFixed(2)}</td>
              <td>{parseFloat(detail.price).toFixed(2)}</td>
              <td>{detail.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Total */}
      <div className="mt-4 p-4 border-t border-gray-300">
        <p>
          <strong>Subtotal:</strong> {subtotal.toFixed(2)}
        </p>
        <p>
          <strong>Tax ({(taxRateFloat * 100).toFixed(2)}%):</strong>{" "}
          {taxAmount.toFixed(2)}
        </p>
        <p className="text-lg font-bold">
          <strong>Grand Total:</strong> {grandTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default TransactionDetailTable;
