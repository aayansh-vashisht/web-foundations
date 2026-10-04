import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

/* ==========================================================================
   1. FORM MODEL & STRICT TYPED ERRORS
   ========================================================================== */

/**
 * Concrete form values model with strictly known fields and scalar types.
 */
export interface RegistrationFormValues {
    username: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

/**
 * Mapped error type strictly constrained to known keys of form values T.
 * Disallows arbitrary string keys and enforces that error keys mirror form fields.
 */
export type FormErrors<T> = {
    [K in keyof T]?: string;
};

/**
 * Explicit error type bound directly to RegistrationFormValues.
 * Equivalent to:
 * {
 *   username?: string;
 *   email?: string;
 *   age?: string;
 *   password?: string;
 *   confirmPassword?: string;
 *   acceptTerms?: string;
 * }
 */
export type RegistrationFormErrors = FormErrors<RegistrationFormValues>;

export interface ValidationResult<T> {
    isValid: boolean;
    errorCount: number;
    errors: FormErrors<T>;
}

/* ==========================================================================
   2. VALIDATION ENGINE
   ========================================================================== */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates known form fields against specific domain constraints.
 * Populates only typed keys in RegistrationFormErrors.
 */
export function validateRegistrationForm(
    values: RegistrationFormValues
): ValidationResult<RegistrationFormValues> {
    const errors: RegistrationFormErrors = {};

    // Username validation
    const cleanUsername = values.username.trim();
    if (!cleanUsername) {
        errors.username = 'Username is required.';
    } else if (cleanUsername.length < 3) {
        errors.username = 'Username must be at least 3 characters long.';
    } else if (cleanUsername.length > 20) {
        errors.username = 'Username cannot exceed 20 characters.';
    }

    // Email validation
    const cleanEmail = values.email.trim();
    if (!cleanEmail) {
        errors.email = 'Email address is required.';
    } else if (!EMAIL_PATTERN.test(cleanEmail)) {
        errors.email = 'Enter a valid email address (e.g., user@domain.com).';
    }

    // Age validation
    if (Number.isNaN(values.age)) {
        errors.age = 'Age must be a valid number.';
    } else if (!Number.isInteger(values.age)) {
        errors.age = 'Age must be an integer.';
    } else if (values.age < 18) {
        errors.age = 'You must be at least 18 years old to register.';
    } else if (values.age > 120) {
        errors.age = 'Please enter a realistic age.';
    }

    // Password validation
    if (!values.password) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = 'Password must include at least one uppercase letter.';
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = 'Password must include at least one digit.';
    }

    // Password confirmation matching
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirmation password is required.';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
    }

    // Terms and conditions acceptance
    if (!values.acceptTerms) {
        errors.acceptTerms = 'You must accept the terms and conditions.';
    }

    const errorKeys = Object.keys(errors) as (keyof RegistrationFormValues)[];

    return {
        isValid: errorKeys.length === 0,
        errorCount: errorKeys.length,
        errors,
    };
}

/* ==========================================================================
   3. INTERACTIVE CLI RUNNER
   ========================================================================== */

function displayValidationReport(
    values: RegistrationFormValues,
    result: ValidationResult<RegistrationFormValues>
) {
    console.log('\n======================================================');
    console.log('              FORM VALIDATION REPORT                  ');
    console.log('======================================================');
    console.log('Submitted Values:');
    console.log({
        ...values,
        password: '[REDACTED]',
        confirmPassword: '[REDACTED]',
    });

    console.log('\nResult: ' + (result.isValid ? ' PASSED (Valid)' : ' FAILED (Invalid)'));
    console.log(`Total Errors: ${result.errorCount}`);

    if (!result.isValid) {
        console.log('\nField Violations (Strictly Typed FormErrors):');
        for (const [field, message] of Object.entries(result.errors)) {
            console.log(`  • [${field}]: ${message}`);
        }
    }
    console.log('======================================================\n');
}

async function startCli() {
    const rl = readline.createInterface({ input, output });

    while (true) {
        console.log('=== FORM VALIDATION ENGINE (CLI) ===');
        console.log('1. Run Valid Form Preset');
        console.log('2. Run Invalid Form Preset (Multiple Errors)');
        console.log('3. Fill Interactive Registration Form Wizard');
        console.log('4. Exit');

        const choice = (await rl.question('\nSelect an option (1-4): ')).trim();

        switch (choice) {
            case '1': {
                const validPayload: RegistrationFormValues = {
                    username: 'alex_developer',
                    email: 'alex@example.com',
                    age: 26,
                    password: 'SecretPassword123',
                    confirmPassword: 'SecretPassword123',
                    acceptTerms: true,
                };
                const outcome = validateRegistrationForm(validPayload);
                displayValidationReport(validPayload, outcome);
                break;
            }

            case '2': {
                const invalidPayload: RegistrationFormValues = {
                    username: 'al',                    // Too short (< 3)
                    email: 'invalid-email-address',    // Malformed regex
                    age: 15,                           // Below minimum age (< 18)
                    password: 'weak',                  // Too short, lacks digits & caps
                    confirmPassword: 'mismatch-pass',  // Does not match password
                    acceptTerms: false,                // Did not accept terms
                };
                const outcome = validateRegistrationForm(invalidPayload);
                displayValidationReport(invalidPayload, outcome);
                break;
            }

            case '3': {
                console.log('\n--- Registration Form Wizard ---');
                const username = await rl.question('Enter username: ');
                const email = await rl.question('Enter email: ');
                const ageInput = await rl.question('Enter age: ');
                const password = await rl.question('Enter password: ');
                const confirmPassword = await rl.question('Confirm password: ');
                const termsInput = await rl.question('Accept terms? (y/n): ');

                const userPayload: RegistrationFormValues = {
                    username,
                    email,
                    age: parseInt(ageInput, 10),
                    password,
                    confirmPassword,
                    acceptTerms: termsInput.trim().toLowerCase() === 'y',
                };

                const outcome = validateRegistrationForm(userPayload);
                displayValidationReport(userPayload, outcome);
                break;
            }

            case '4': {
                console.log('Exiting Form Validator CLI.');
                rl.close();
                return;
            }

            default: {
                console.log('Invalid option, please choose between 1 and 4.\n');
            }
        }
    }
}

startCli();