"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Carousel } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

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
import ImageUpload from "@/components/ui/image-upload";
import { CarouselSchema } from "@/schemas";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { deleteCarousel } from "@/actions/deleteCarousel";
import { createCarousel } from "@/actions/createCarousel";
import { updateCarousel } from "@/actions/updateCarousel";

type carouselFormValues = z.infer<typeof CarouselSchema>;

interface carouselFormProps {
  initialData: Carousel | null;
}

export const CarouselForm: React.FC<carouselFormProps> = ({ initialData }) => {
  const params = useParams();

  const [open, setOpen] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const title = initialData ? "Edit carousel" : "Create carousel";
  const description = initialData ? "Edit a carousel." : "Add a new carousel";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<carouselFormValues>({
    resolver: zodResolver(CarouselSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CarouselSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      initialData &&
        updateCarousel(values, { carouselId: initialData.id })
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
      !initialData &&
        createCarousel(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/admin/carousel/");
            }
          })
          .catch(() => setError("Something went wrong"));
    });
  };

  const onDelete = async () => {
    startTransition(() => {
      confirm("Do You want to delete this section") &&
        initialData &&
        deleteCarousel(initialData.id)
          .then((data) => {
            if (data?.error) {
              alert("ERROR WHILE DELETING");
            }

            if (data?.success) {
              window.location.assign("/admin/carousel/");
            }
          })
          .catch(() => alert("ERROR WHILE DELETING"));
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isPending}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Carousel label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
