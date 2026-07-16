export const printLabel = () => {
    const printContents = document.getElementById("product-label")

    if(!printContents) return

    const printWindow  = window.open("","","width=600,height=600")

    if(!printWindow) return

    printWindow.document.write(
        `
            <html>
                <head>
                    <title>Product Label</title>
                    <style>
                        body{
                            display:flex,
                            justify-content:center,
                            align-items:center,
                            height:100vh,
                            font-family:Arial,sans-serif
                        }
                        #product-label
                        {
                            border: 1px solid #ccc,
                            padding:20px,
                            width:320px,
                            text-align:center
                        }
                    </style>
                </head>
                <body>
                    ${printContents.outerHTML}
                </body>
            </html>
        `
    )
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
}