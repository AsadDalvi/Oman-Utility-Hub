// frontend/src/component/haptics.js

/**
 * Universal Mobile Browser Haptics Utility Engine
 * Safety-wrapped to completely protect desktop environments from execution crashes.
 */
export const haptics = {
  /**
   * Triggers a sharp, tactile click pulse ideal for standard button selections.
   * Default: 15 milliseconds duration.
   */
  click: () => {
    if (typeof window !== "undefined" && navigator && typeof navigator.vibrate === "function") {
      navigator.vibrate(15);
    }
  },

  /**
   * Triggers a rapid, micro-tick vibration optimal for continuous input sliders.
   * Default: 5 milliseconds duration.
   */
  tick: () => {
    if (typeof window !== "undefined" && navigator && typeof navigator.vibrate === "function") {
      navigator.vibrate(5);
    }
  }
};
