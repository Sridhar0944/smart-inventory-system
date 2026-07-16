import Barcode from "react-barcode";

interface BarcodeProps{
    value:string
}

const BarcodeGenerate = ({ value }: BarcodeProps) => {
    return(
        <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Product Barcode
            </h3>
            {value ? (
                <Barcode
                    value={value}
                    width={1.5}
                    height={50}
                    displayValue={true}
                />
            ) : (
                <p className="text-gray-500">
                    Barcode not available
                </p>
            )}
        </div>
    )
}

export default BarcodeGenerate;