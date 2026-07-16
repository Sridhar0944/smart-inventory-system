const bwipjs = require("bwip-js")
const QRCode = require("qrcode")

// Generate Barcode

const generateBarcode = async (text) => {
    const png = await bwipjs.toBuffer({
        bcid:"code128",
        text:text,
        scale:3,
        height:10,
        includetext:true
    })

    return png
}

// Generate QR Code

const generateQRCode = async (text) => {
    const qr = await QRCode.toDataURL(text)
    return qr
}

module.exports = {generateBarcode,generateQRCode}