import React, { useState } from "react";
import { ZodSchema } from "zod";
import CustomBotton from "../CustomBotton";
import FormInput from "../FormInput";
import axios from "axios";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "time" | "file" | "submit";
}

interface DynamicFormProps {
  schema: ZodSchema<unknown>;
  fields: Field[];
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  onSuccess?: (data: unknown) => void;
  defaultValues?: Record<string, string>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  fields,
  endpoint,
  method = "POST",
  onSuccess,
  defaultValues,
}) => {
  const [formData, setFormData] = useState<Record<string, string | File | undefined>>(defaultValues || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setLoading(true);
    setErrors({});
    try {
      const result = schema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
        setLoading(false);
        return;
      }
      // Prepare form data for file upload
      const hasFile = fields.some((f) => f.type === "file");
      let dataToSend: FormData | Record<string, string | File | undefined> = formData;
      const headers: Record<string, string> = {};
      if (hasFile) {
        const fd = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value instanceof File) {
            fd.append(key, value);
          } else if (typeof value === "string") {
            fd.append(key, value);
          }
        });
        dataToSend = fd;
        headers["Content-Type"] = "multipart/form-data";
      }
      const response = await axios.request({
        url: endpoint,
        method,
        data: dataToSend,
        headers,
      });
      setLoading(false);
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setSubmitError(err.response?.data?.message || "Submission failed");
      } else {
        setSubmitError("Submission failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => {
        if (field.type === "submit") {
          return (
            <CustomBotton
              key={field.name}
              type="submit"
              label={loading ? "Submitting..." : field.label}
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-accent hover:text-white mt-4"
              onClick={() => {}}
            />
          );
        }
        if (field.type === "file") {
          return (
            <div key={field.name}>
              <label className="block mb-1 font-medium">{field.label}</label>
              <FormInput
                type="file"
                name={field.name}
                value=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files && e.target.files[0];
                  handleFileChange(field.name, file || null);
                }}
              />
              {errors[field.name] && (
                <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>
              )}
            </div>
          );
        }
        return (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <FormInput
              type={field.type === "textarea" ? "text" : field.type}
              name={field.name}
              value={formData[field.name] ? String(formData[field.name]) : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.name, e.target.value)}
            />
            {errors[field.name] && (
              <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>
            )}
          </div>
        );
      })}
      {submitError && <div className="text-red-500 text-sm">{submitError}</div>}
    </form>
  );
};

export default DynamicForm; 