import { describe, it, expect } from "vitest";
import AlertsList from "@/components/AlertsList.vue";
import { mountComponent, mockAlert } from "../utils/test-utils";

describe("AlertsList", () => {
  it("renders correctly", () => {
    const wrapper = mountComponent(AlertsList, {
      props: {
        alerts: [],
        loading: false,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("renders alerts correctly", () => {
    const alerts = [mockAlert];
    const wrapper = mountComponent(AlertsList, {
      props: { alerts },
    });

    expect(wrapper.text()).toContain("Test Alert");
    expect(wrapper.text()).toContain("This is a test alert");
  });

  it("shows loading state", () => {
    const wrapper = mountComponent(AlertsList, {
      props: {
        alerts: [],
        loading: true,
      },
    });

    expect(wrapper.find(".animate-pulse").exists()).toBe(true);
  });

  it("shows empty state when no alerts", () => {
    const wrapper = mountComponent(AlertsList, {
      props: { alerts: [] },
    });

    expect(wrapper.text()).toContain("No alerts found");
  });

  it("emits acknowledge event", async () => {
    const alerts = [mockAlert];
    const wrapper = mountComponent(AlertsList, {
      props: { alerts },
    });

    const acknowledgeButton = wrapper.find("button");
    await acknowledgeButton.trigger("click");

    expect(wrapper.emitted("acknowledge")).toBeTruthy();
    expect(wrapper.emitted("acknowledge")?.[0]).toEqual(["1"]);
  });

  it("applies correct alert type classes", () => {
    const criticalAlert = { ...mockAlert, type: "critical" as const };
    const wrapper = mountComponent(AlertsList, {
      props: { alerts: [criticalAlert] },
    });

    expect(wrapper.find(".border-red-500").exists()).toBe(true);
  });
});
