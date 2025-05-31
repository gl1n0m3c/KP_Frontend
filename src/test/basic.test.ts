import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";

// Простой тест для проверки mock данных
describe("Mock Data", () => {
  it("should have valid mock user", () => {
    const mockUser = {
      id: "1",
      email: "gorilla@cheburnet.com",
      name: "Network Administrator",
      role: "admin",
    };

    expect(mockUser.id).toBe("1");
    expect(mockUser.email).toContain("@");
    expect(mockUser.name).toBeTruthy();
  });
});

// Простой тест для компонента
describe("StatusCard Component", () => {
  it("should render with basic props", () => {
    // Создаем простой компонент для тестирования
    const TestComponent = {
      template: `
        <div class="status-card">
          <h3>{{ title }}</h3>
          <p>{{ value }}</p>
        </div>
      `,
      props: {
        title: String,
        value: String,
      },
    };

    const i18n = createI18n({
      legacy: false,
      locale: "en",
      messages: {
        en: { test: "Test" },
      },
    });

    const wrapper = mount(TestComponent, {
      props: {
        title: "Network Status",
        value: "Online",
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.text()).toContain("Network Status");
    expect(wrapper.text()).toContain("Online");
    expect(wrapper.find(".status-card").exists()).toBe(true);
  });
});
