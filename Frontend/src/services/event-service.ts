import mitt from "mitt";

// Define a strict event map
type Events = {
  updateProfile: { action: string; from: string; amount?: number };
};

export const eventBus = mitt<Events>();
