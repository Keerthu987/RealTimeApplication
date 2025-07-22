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
// export function increaseProductAPI(id) {
//   return
// }
export function decreaseProductAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}
