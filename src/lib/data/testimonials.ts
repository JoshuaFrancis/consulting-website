export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  source?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "It was a pleasure to work with Joshua. We got an amazing UX review of our product and were very pleased with the results. We will likely hire him in the future.",
    author: "Upwork Client",
    role: "UX Review Project",
    source: "upwork",
  },
  {
    quote:
      "Josh was excellent and put a lot of attention into my requirements to get a whole collection page made for such a low budget. He's given me a few revisions all for free. I provided him with Loom videos and he made changes accordingly. It was a smooth process. I look forward to working with him more.",
    author: "MUSCLED Inc",
    role: "Upwork Client",
    source: "upwork",
  },
  {
    quote:
      "Working with Joshua was a pleasure. He is undoubtedly a professional! He worked quickly and above my expectations. Hope to work with him again in the future.",
    author: "Fresco Art",
    role: "Upwork Client",
    source: "upwork",
  },
  {
    quote:
      "Joshua did a wonderful job. Everything went smoothly, communication was fluent, delivered on time and as expected. I highly recommend working with Joshua.",
    author: "Upwork Client",
    role: "Upwork Client",
    source: "upwork",
  },
];
