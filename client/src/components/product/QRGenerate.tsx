import QRCode from "react-qr-code";

interface QRProps{
    data:any
}

const QRGenerate = ({data}:QRProps) => {
    return(
        <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Product QR Code
            </h3>

            {data ? (
                <QRCode
                    value={JSON.stringify(data)}
                    size={160}
                />
            ):(
                <p className="text-gray-500">
                    QR Code not available
                </p>
            )}
        </div>
    )
}

export default QRGenerate