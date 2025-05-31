import { describe, it, expect } from "vitest";
import { Activity } from "lucide-vue-next";
import StatusCard from "@/components/StatusCard.vue";
import { mountComponent } from "../utils/test-utils";

describe("StatusCard", () => {
  it("renders correctly", () => {
    const wrapper = mountComponent(StatusCard, {
      props: {
        title: "Test Card",
        value: "100",
        status: "success",
        icon: Activity,
        loading: false,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
