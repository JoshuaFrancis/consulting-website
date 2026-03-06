export interface Testimonial {
  quote: string;
  author?: string;
  role: string;
  source?: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "It was a pleasure to work with Joshua. We got an amazing UX review of our product and were very pleased with the results. We will likely hire him in the future.",
    role: "UX Review Project",
    image: "/Testimonial-4.jpg",
  },
  {
    quote:
      "Josh was excellent and put a lot of attention into my requirements. I provided him with Loom videos and he made changes accordingly. It was a smooth process. I look forward to working with him more.",
    author: "MUSCLED Inc",
    role: "UI/UX Design",
    image: "/Testimonial-1.jpg",
  },
  {
    quote:
      "Working with Joshua was a pleasure. He is undoubtedly a professional! He worked quickly and above my expectations. Hope to work with him again in the future.",
    author: "Fresco Art",
    role: "Brand & Design",
    image: "/Testimonial-2.jpg",
  },
  {
    quote:
      "Joshua did a wonderful job. Everything went smoothly, communication was fluent, delivered on time and as expected. I highly recommend working with Joshua.",
    role: "Product Design",
    image: "/Testimonial-3.jpg",
  },
];
