"use client";

import { FormEvent, useState } from "react";

export interface UseWaitlistFormOptions {
  readonly successMessage: string;
}

export interface UseWaitlistFormResult {
  readonly email: string;
  readonly statusMessage: string;
  readonly isSubmitting: boolean;
  readonly handleEmailChange: (value: string) => void;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useWaitlistForm(
  options: Readonly<UseWaitlistFormOptions>,
): UseWaitlistFormResult {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (value: string): void => {
    setEmail(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!email.trim()) {
      setStatusMessage("Please enter a valid email.");
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 450);
    });

    setStatusMessage(options.successMessage);
    setEmail("");
    setIsSubmitting(false);
  };

  return {
    email,
    statusMessage,
    isSubmitting,
    handleEmailChange,
    handleSubmit,
  };
}
