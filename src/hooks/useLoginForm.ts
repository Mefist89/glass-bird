"use client";

import { FormEvent, useState } from "react";

export interface UseLoginFormResult {
  readonly email: string;
  readonly password: string;
  readonly isSubmitting: boolean;
  readonly handleEmailChange: (value: string) => void;
  readonly handlePasswordChange: (value: string) => void;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useLoginForm(): UseLoginFormResult {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (value: string): void => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    setIsSubmitting(false);
  };

  return {
    email,
    password,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}
