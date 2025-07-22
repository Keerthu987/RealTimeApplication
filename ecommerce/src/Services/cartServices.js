import apiClient from "../utils/api-client";
// export function addToCartAPI(id, quantity) {
//   return
// }

// export function getCartAPI() {
//   return apiClient.get("/cart");
// }

// export function removeFromCarAPI(id) {
//   return
// }
export function increaseProductAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}
export function decreaseProductAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}
