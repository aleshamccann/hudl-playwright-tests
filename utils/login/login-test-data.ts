export const loginTestData = {
    invalidEmail: 'invalid_email',
    incorrectEmail: 'incorrect_email@test.com',
    incorrectPassword: 'wrongpassword',
    errorMessageInvalidEmail: 'Enter a valid email.',
    errorMessageIncorrectUsername: 'Incorrect username or password.',
    errorMessageIncorrectPassword: 'Your email or password is incorrect. Try again.',
    getValidCredentials: () => {
        return {
            validEmail: process.env.HUDL_USERNAME || 'default.email@example.com',
            validPassword: process.env.HUDL_PASSWORD || 'defaultPassword',
        };
    },
};