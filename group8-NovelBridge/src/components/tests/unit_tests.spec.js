import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import About from "@/components/About.vue";
import { waitForPendingWrites } from "firebase/firestore";

describe("About.vue", () => {

  it("should renders is page content is correct", async() => {
    const wrapper = mount(About);
    const cont = await wrapper.find('h1').html()
    expect(cont).toContain('About');
  });

});

