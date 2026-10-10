import { useCart } from "../context/CartContext.jsx";

export default function ToastMessage() {
  const { toast } = useCart();
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className={"toast align-items-center text-bg-success border-0" + (toast ? " show" : "")} role="alert">
        <div className="d-flex">
          <div className="toast-body">✅ {toast}</div>
        </div>
      </div>
    </div>
  );
}
