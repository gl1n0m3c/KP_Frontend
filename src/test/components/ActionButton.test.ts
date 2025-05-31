import { describe, it, expect } from "vitest";
import { Settings } from "lucide-vue-next";
import ActionButton from "@/components/ActionButton.vue";
import { mountComponent } from "../utils/test-utils";

describe("ActionButton", () => {
  it("renders correctly with props", () => {
    const wrapper = mountComponent(ActionButton, {
      props: {
        title: "Test Action",
        description: "Test description",
        icon: Settings,
      },
    });

    expect(wrapper.text()).toContain("Test Action");
    expect(wrapper.text()).toContain("Test description");
  });

  it("shows loading state", () => {
    const wrapper = mountComponent(ActionButton, {
      props: {
        title: "Test Action",
        description: "Test description",
        icon: Settings,
        loading: true,
      },
    });

    expect(wrapper.find(".animate-spin").exists()).toBe(true);
  });

  it("emits click event", async () => {
    const wrapper = mountComponent(ActionButton, {
      props: {
        title: "Test Action",
        description: "Test description",
        icon: Settings,
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("is disabled when loading", () => {
    const wrapper = mountComponent(ActionButton, {
      props: {
        title: "Test Action",
        description: "Test description",
        icon: Settings,
        loading: true,
      },
    });

    expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  });

  it("renders correctly", () => {
    const wrapper = mountComponent(ActionButton, {
      props: {
        title: "Test Button",
        description: "Test Description",
        icon: Settings,
        loading: false,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
