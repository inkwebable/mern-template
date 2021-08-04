// Password requires at least 1 lower case character, 1 upper case character, 1 number, 1 special character and must be at least 6 characters and at most 50
export const StrongPasswordRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;

// Password expression. Password must be between 4 and 8 digits long and include at least one numeric digit.
export const BasicPasswordRegex = /^(?=.*\d).{4,8}$/;
