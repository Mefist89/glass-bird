"use client";

import { FormEvent, useState } from "react";

export interface UseRegisterFormResult {
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly isSubmitting: boolean;
  readonly handleFullNameChange: (value: string) => void;
  readonly handleEmailChange: (value: string) => void;
  readonly handlePasswordChange: (value: string) => void;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useRegisterForm(): UseRegisterFormResult {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFullNameChange = (value: string): void => {
    setFullName(value);
  };

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
      setTimeout(resolve, 550);
    });

    setIsSubmitting(false);
  };

  return {
    fullName,
    email,
    password,
    isSubmitting,
    handleFullNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}
