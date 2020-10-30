import { Location } from "history";
import { IRoutes } from "../routes/routes.type";

export function getTitle(location: Location, routes: IRoutes[]) {
  const currentLocation = location.pathname;
  const occurrenceSlash = currentLocation.slice(1).search("/");
  let title = "";

  if (occurrenceSlash === -1) {
    routes.forEach((value) => (value.path === currentLocation ? (title = value.name) : ""));
  } else {
    routes.forEach((value) =>
      currentLocation.endsWith(value.path, occurrenceSlash + 1) ? (title = value.name) : ""
    );
  }

  return title;
}
