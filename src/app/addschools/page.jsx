"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./page.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Link } from "next/link";

export const imgURLbuilder = (image) => {
  return "https://school-backend-sglg.onrender.com/" + image;
};

const AddSchools = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("contact", data.contact);
    formData.append("image", data.image[0]);

    try {
      const response = await axios.post(
        "https://school-backend-sglg.onrender.com/api/schools",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("School added successfully:", response.data);

      reset();

      router.push("/");
      toast.success("School added successfully");
    } catch (error) {
      console.error("Error adding school:", error);

      toast.error("Error adding school");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.title}>Add School</h1>
      <div>
        <label className={styles.label}>School Name:</label>
        <input
          type="text"
          {...register("name", { required: "School name is required" })}
          className={styles.inputText}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className={styles.inputEmail}
        />

        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div>
        <label className={styles.label}>Address:</label>
        <input
          type="text"
          {...register("address", { required: "Address is required" })}
          className={styles.inputText}
        />
        {errors.address && (
          <p className={styles.error}>{errors.address.message}</p>
        )}
      </div>
      <div>
        <label className={styles.label}>State:</label>
        <input
          type="text"
          {...register("state", { required: "State is required" })}
          className={styles.inputText}
        />
        {errors.state && <p className={styles.error}>{errors.state.message}</p>}
      </div>

      <div>
        <label className={styles.label}>City:</label>
        <input
          type="text"
          {...register("city", { required: "City is required" })}
          className={styles.inputText}
        />
        {errors.city && <p className={styles.error}>{errors.city.message}</p>}
      </div>

      <div>
        <label className={styles.label}>Contact no</label>
        <input
          type="number"
          {...register("contact", { required: "Contact no is required" })}
          className={styles.inputText}
        />
        {errors.contact && (
          <p className={styles.error}>{errors.contact.message}</p>
        )}
      </div>
      <div>
        <label className={styles.label}>Image:</label>
        <input
          type="file"
          {...register("image", { required: "Image is required", maxFiles: 1 })}
          className={styles.inputFile}
        />

        {errors.image && <p className={styles.error}>{errors.image.message}</p>}
      </div>
      <div className="button-group">
        <button type="submit" className={styles.button}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button className={styles.button} onClick={() => router.back()}>
          Back
        </button>
      </div>
    </form>
  );
};

export default AddSchools;
