import Barcode from "react-barcode";
import QRCode from "react-qr-code";

interface Props {
  product: {
    product_name: string;
    barcode: string;
    price: string;
  };
}

const ProductLabel = ({ product }: Props) => {
  return (
    <div
      id="product-label"
      className="w-80 rounded-lg border-2 border-black bg-white p-5 shadow"
    >
      <h2 className="text-center text-xl font-bold">
        {product.product_name}
      </h2>

      <p className="text-gray-500 text-sm">
        Inventory Label
      </p>

      <p className="mt-2 text-center">
        Price: ₹{product.price}
      </p>

      <p className="mt-2 font-bold">
        Stock: Available
      </p>

      <div className="mt-5 flex justify-center">
        <Barcode
          value={product.barcode}
          width={1.5}
          height={60}
          fontSize={14}
        />
      </div>

      <div className="mt-5 flex justify-center">
        <QRCode
          value={product.barcode}
          size={120}
        />
      </div>

      <p className="mt-3 text-center text-sm text-gray-500">
        Smart Inventory System
      </p>
    </div>
  );
};

export default ProductLabel;