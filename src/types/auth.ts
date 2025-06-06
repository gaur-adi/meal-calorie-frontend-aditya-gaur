export type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  token: string;
}; 