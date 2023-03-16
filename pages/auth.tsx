/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BiLoaderCircle } from 'react-icons/bi';
import { FormAuth } from '@/types/global';

import { Input } from '@/components/UI';
import useAuth from '@/libs/hooks/useAuth';

const Login = () => {
  const [login, setLogin] = useState<Boolean>(false);
  const { signIn, signUp } = useAuth();

  const { handleSubmit, control, formState, setValue } = useForm<FormAuth>({
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormAuth> = async ({
    email,
    password,
    username,
  }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password, username);
    }
  };

  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-screen w-full bg-[url('https://rb.gy/p2hphi')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black/50 w-full h-full">
          <nav className="px-12 py-5">
            <img src="https://rb.gy/ulxxee" className="h-12" alt="Logo" />
          </nav>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"
            >
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {login ? 'Sign in' : 'Sign up'}
              </h2>
              <div className="flex flex-col gap-4">
                {!login && (
                  <Input
                    type="text"
                    placeholder="Username"
                    form={{
                      control,
                      name: 'username',
                      rules: {
                        required: 'Username field is required',
                        pattern: {
                          value: /^[a-zA-Z0-9_]{3,30}\S*$/,
                          message:
                            'Username must be be 3 and not more than 30 characters',
                        },
                      },
                    }}
                  />
                )}

                <Input
                  placeholder="Email address"
                  type="email"
                  form={{
                    control,
                    name: 'email',
                    rules: {
                      required: 'Email field is required',
                      pattern: {
                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                        message: 'Email must be a valid email',
                      },
                    },
                  }}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  form={{
                    control,
                    name: 'password',
                    rules: {
                      required: 'Password field is required',
                      pattern: {
                        value: /^(?=.*[A-Z])[\w@$!%*?&]{3,10}$/g,
                        message:
                          'Password must be 3 and not more than 10 characters and contain at least one capital letter',
                      },
                    },
                  }}
                />
              </div>
              <button
                type="submit"
                className="flex justify-center py-3 text-white text-base min-h-[42px] rounded-md w-full mt-10 bg-[#e50914] hover:bg-red-700 transition"
              >
                {formState.isSubmitting ? (
                  <BiLoaderCircle className="animate-spin" size={24} />
                ) : login ? (
                  'Sign in'
                ) : (
                  'Sign up'
                )}
              </button>
              {login ? (
                <p className="text-neutral-500 mt-12">
                  First time using Netflix?
                  <button
                    type="button"
                    onClick={() => setLogin(false)}
                    className="text-white ml-1 hover:underline cursor-pointer"
                  >
                    Create an account
                  </button>
                </p>
              ) : (
                <p className="text-neutral-500 mt-12">
                  Already have an account?
                  <button
                    type="button"
                    onClick={() => setLogin(true)}
                    className="text-white ml-1 hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
