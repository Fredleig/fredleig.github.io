export const noAvatarSrc = "/static/img/no_avatar.jpg";

export function isEmptyObj(obj: object) {
  for (let key in obj) {
    return false;
  }
  return true;
}
