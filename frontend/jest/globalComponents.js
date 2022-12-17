import {
  BIconArrowLeft,
  BIconChevronLeft,
  BIconChevronRight,
  BIconHouseDoorFill,
  BIconInboxFill,
  BIconTagFill,
  BIconTagsFill,
  BIconPersonFill,
  BIconSearch,
  BIconDot,
  BIconJournalText,
  BIconX,
  BIconClipboard,
  BIconStack,
  BIconCheckCircle,
  BAvatar,
  BProgress,
  BProgressBar,
  BModal,
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";

const GlobalComponents = {
  install(Vue) {
    Vue.component("BIconArrowLeft", BIconArrowLeft);
    Vue.component("BIconChevronLeft", BIconChevronLeft);
    Vue.component("BIconChevronRight", BIconChevronRight);
    Vue.component("BIconHouseDoorFill", BIconHouseDoorFill);
    Vue.component("BIconInboxFill", BIconInboxFill);
    Vue.component("BIconTagFill", BIconTagFill);
    Vue.component("BIconTagsFill", BIconTagsFill);
    Vue.component("BIconPersonFill", BIconPersonFill);
    Vue.component("BIconSearch", BIconSearch);
    Vue.component("BIconDot", BIconDot);
    Vue.component("BIconJournalText", BIconJournalText);
    Vue.component("BIconX", BIconX);
    Vue.component("BIconClipboard", BIconClipboard);
    Vue.component("BIconStack", BIconStack);
    Vue.component("BIconCheckCircle", BIconCheckCircle);
    Vue.component("BAvatar", BAvatar);
    Vue.component("BProgress", BProgress);
    Vue.component("BProgressBar", BProgressBar);
    Vue.component("BModal", BModal);
    Vue.component("BDropdown", BDropdown);
    Vue.component("BDropdownItem", BDropdownItem);
  },
};

export default GlobalComponents;
