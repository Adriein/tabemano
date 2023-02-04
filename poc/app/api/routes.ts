export const TabemanoApi = {
  v1: 'http://localhost:5000/api/v1'
}

export const Checkout = {
  product: {
    detail: (productId: string) => `/checkout/product?productId=${productId}`
  }
}