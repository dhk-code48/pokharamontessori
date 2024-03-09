"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Site } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { SettingSchema } from "@/schemas";
import { updateSetting } from "@/actions/updateSite";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import ImageUpload from "@/components/ui/image-upload";

type SettingsFormValues = z.infer<typeof SettingSchema>;

interface SettingsFormProps {
  initialData: Site;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      address: initialData.address ?? "",
      phoneNumber: initialData.phoneNumber ?? "",
      email: initialData.email ?? "",
      facebookId: initialData.facebookId ?? "",
      logoLight: initialData.logoLight ? initialData.logoLight : "",
      logoDark: initialData.logoDark ? initialData.logoDark : "",
      instagram: initialData.instagram ?? "",
      name: initialData.name ?? "",
      youtube: initialData.youtube ?? "",
      seoBanner: initialData.seoBanner ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      initialData &&
        updateSetting(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign(window.location.toString());
            }
          })
          .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Site settings" description="Manage Site preferences" />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="seoBanner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isPending}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-3 item-center">
            <FormField
              control={form.control}
              name="logoLight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Light</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={isPending}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logoDark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Dark</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={isPending}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Site name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="schoolname@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Kathmandu, Nepal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="+977 9812345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="facebookId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook User Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="school.name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="school.insta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="school.youtube" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
