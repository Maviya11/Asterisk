import { apiClient } from "./api-client";
import { ProfileData } from "./profile-service";

export const getUidFromCookie = (): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === "uid") return value;
  }
  return null;
};

class HttpService {
  endpoint: string;
  dotExtension?: string;

  constructor(endpoint: string, dotExtension?: string) {
    this.endpoint = endpoint;
    if (dotExtension) this.dotExtension = dotExtension;
  }

  getAll<T>() {
    const controller = new AbortController();
    const result = apiClient.get<T[]>(`${this.endpoint}${this.dotExtension}`, {
      signal: controller.signal,
    });
    return { result, cancel: () => controller.abort() };
  }

  updateCount<T>(
    index: number,
    chore: T,
    count: number | null,
    field: "plus" | "minus"
  ) {
    if (count !== null)
      return apiClient.put(`${this.endpoint}/${index}${this.dotExtension}`, {
        ...chore,
        [field]: count + 1,
      });

    return Promise.resolve(null);
  }

  add<T>(index: number | undefined, entity: T) {
    return apiClient.put(
      `${this.endpoint}/${index}${this.dotExtension}`,
      entity
    );
  }

  delete(index: number | undefined) {
    return apiClient.delete(`${this.endpoint}/${index}${this.dotExtension}`);
  }

  updateProfile(data: ProfileData) {
    return apiClient.put(`${this.endpoint}${this.dotExtension}`, {
      ...data,
    });
  }
}

const create = (endpoint: string, dotExtension?: string) =>
  new HttpService(endpoint, dotExtension);

export default create;
