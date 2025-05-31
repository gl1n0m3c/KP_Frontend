import { describe, it, expect } from "vitest";
import NetworkChart from "@/components/NetworkChart.vue";
import { mountComponent } from "../utils/test-utils";

describe("NetworkChart", () => {
  it("renders correctly", () => {
    const wrapper = mountComponent(NetworkChart, {
      props: {
        data: [],
        loading: false,
        height: 300,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
