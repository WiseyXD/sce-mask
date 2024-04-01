import AuthForm from '@/components/auth/AuthForm';
import React from 'react';

export default function page() {
    return (
        <AuthForm
            label="Login"
            labelText="Enter your email below to Login on SCOE-Mask"
            backButtonHref="/auth/register"
            backButtonText="Register"
            backButtonLabel="Don't have an account ?"
            submitButton="Login"
        />
    );
}
