import { InferType, object, string } from 'yup';

export const userSchema = object({
  email: string().email().required('이메일 주소는 필수 입니다.'),
  name: string().required(),
  avatarUrl: string(), //FIXME: BE와 협의해서 수정 필요.
  theme: string<'dark' | 'light'>().required().default('dark'),
  font: string().required(), //FIXME:
  language: string<'ko' | 'en'>().required().default('en'),
});
export type User = InferType<typeof userSchema>;

export const userJoinSchema = object({
  password: string().required(),
}).concat(userSchema);

export type UserJoin = InferType<typeof userJoinSchema>;

export const loginSchema = userJoinSchema.pick(['email', 'password']);
export type Login = InferType<typeof loginSchema>;
