export function formatCurrency(price: number) {
    return new Intl.NumberFormat("es-DO", {
        style: "currency",
        currency: "DOP",
    }).format(price)
}

export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if (imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}