import { describe, it, expect } from "vitest";
import {
  mockLogin,
  generateMockChartData,
  mockDelay,
  mockUser,
  mockDevices,
  mockAlerts,
} from "@/mock/data";

describe("Mock Data", () => {
  describe("mockLogin", () => {
    it("returns success for valid credentials", () => {
      const result = mockLogin("gorilla@cheburnet.com", "password");

      expect(result.success).toBe(true);
      expect(result.user).toEqual(mockUser);
      expect(result.token).toContain("mock-jwt-token");
    });

    it("returns error for invalid credentials", () => {
      const result = mockLogin("wrong@email.com", "wrongpassword");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Invalid credentials");
    });
  });

  describe("generateMockChartData", () => {
    it("generates correct number of points for 1h", () => {
      const data = generateMockChartData("1h");
      expect(data).toHaveLength(12);
    });

    it("generates correct number of points for 24h", () => {
      const data = generateMockChartData("24h");
      expect(data).toHaveLength(24);
    });

    it("generates correct number of points for 7d", () => {
      const data = generateMockChartData("7d");
      expect(data).toHaveLength(7);
    });

    it("generates data with correct structure", () => {
      const data = generateMockChartData("1h");

      expect(data[0]).toHaveProperty("timestamp");
      expect(data[0]).toHaveProperty("value");
      expect(data[0]).toHaveProperty("label");
      expect(typeof data[0].value).toBe("number");
    });
  });

  describe("mockDelay", () => {
    it("resolves after specified time", async () => {
      const start = Date.now();
      await mockDelay(100);
      const end = Date.now();

      expect(end - start).toBeGreaterThanOrEqual(90); // Allow some tolerance
    });
  });

  describe("mock data structure", () => {
    it("has valid mock devices", () => {
      expect(mockDevices).toBeInstanceOf(Array);
      expect(mockDevices.length).toBeGreaterThan(0);

      const device = mockDevices[0];
      expect(device).toHaveProperty("id");
      expect(device).toHaveProperty("name");
      expect(device).toHaveProperty("ip");
      expect(device).toHaveProperty("type");
      expect(device).toHaveProperty("status");
    });

    it("has valid mock alerts", () => {
      expect(mockAlerts).toBeInstanceOf(Array);
      expect(mockAlerts.length).toBeGreaterThan(0);

      const alert = mockAlerts[0];
      expect(alert).toHaveProperty("id");
      expect(alert).toHaveProperty("type");
      expect(alert).toHaveProperty("title");
      expect(alert).toHaveProperty("message");
      expect(alert).toHaveProperty("timestamp");
    });
  });
});
