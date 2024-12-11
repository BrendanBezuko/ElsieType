// plugins/directives.js

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("capture-key", {
    beforeMount(el, binding) {
      const handler = (event) => {
        // Call the provided method or event handler
        binding.value(event);
      };
      el.__keyStrokeHandler__ = handler; // Save handler to remove it later
      document.addEventListener("keydown", handler);
    },
    unmounted(el) {
      const handler = el.__keyStrokeHandler__;
      if (handler) {
        document.removeEventListener("keydown", handler);
      }
    },
  });
});
