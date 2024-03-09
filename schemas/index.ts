import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});
export const BillboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
  description: z.string().min(1),
});
export const AuthorSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().min(1),
});

export const BlogSchema = z.object({
  title: z.string().min(1),
  headline: z.string().min(1),
  content: z.string().min(1),
  categoryId: z.string().min(1),
  imageUrl: z.string().min(1),
  authorId: z.string().min(1),
  subcategoryId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
export const CarouselSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});
export const CategorySchema = z.object({
  name: z.string().min(2),
  billboardId: z.string().min(1),
});
export const SettingSchema = z.object({
  name: z.string().min(2),
  seoBanner: z.string().min(2),
  logoLight: z.string().optional(),
  logoDark: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
  facebookId: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  address: z.string().optional(),
});
export const SubCategorySchema = z.object({
  name: z.string().min(2),
  categoryId: z.string().min(1),
});
