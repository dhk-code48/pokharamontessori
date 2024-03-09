"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Author } from "@prisma/client";
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
import { AuthorSchema } from "@/schemas";
import { updateAuthor } from "@/actions/updateAuthor";
import { createAuthor } from "@/actions/createAuthor";
import { deleteAuthor } from "@/actions/deleteAuthor";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

type AuthorFormValues = z.infer<typeof AuthorSchema>;

interface AuthorFormProps {
  initialData: Author | null;
}

export const AuthorForm: React.FC<AuthorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const title = initialData ? "Edit author" : "Create author";
  const description = initialData ? "Edit a author." : "Add a new author";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(AuthorSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AuthorSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      initialData &&
        updateAuthor(values, { authorId: initialData.id })
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
        createAuthor(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/admin/authors/");
            }
          })
          .catch(() => setError("Something went wrong"));
    });
  };

  const onDelete = async () => {
    startTransition(() => {
      confirm("Do You want to delete this section") &&
        initialData &&
        deleteAuthor(initialData.id)
          .then((data) => {
            if (data?.error) {
              alert("ERROR WHILE DELETING");
            }

            if (data?.success) {
              window.location.assign("/superadmin/authors/");
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
                <FormLabel>Avatar</FormLabel>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Author name" {...field} />
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
