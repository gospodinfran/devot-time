import { hashPassword } from '../hashPassword';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import Image from 'next/image';
import { SetStateAction, useState } from 'react';
import { db } from '../../lib/firebase';

interface LoginFormProps {
  setUser: React.Dispatch<SetStateAction<string | null>>;
  register: boolean;
  setRegister: React.Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({
  setUser,
  register,
  setRegister,
}: LoginFormProps) {
  const [formValue, setFormValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValue(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(e.target.value);
  }

  function handleSwapButtonClick() {
    setFormValue('');
    setPasswordValue('');
    setRegister((prev) => !prev);
    setSuccessMessage('');
    setErrorMessage('');
  }

  async function handleFormSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formValue || !passwordValue) {
      setSuccessMessage('');
      setErrorMessage('Please enter a username and password');
      return;
    }

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', formValue), limit(1));
    const qSnap = await getDocs(q);

    // when registering, needs to be empty and then create account
    if (qSnap.empty) {
      if (!register) {
        setErrorMessage('Invalid credentials. Please try again.');
        return;
      }

      const hashedPassword = await hashPassword(passwordValue);
      await addDoc(usersRef, {
        username: formValue,
        password: hashedPassword,
        activeStopwatch: false,
        tasks: [],
      });
      setFormValue('');
      setPasswordValue('');
      setErrorMessage('');
      setSuccessMessage('Successfully registered.');
      setRegister(false);
    } else {
      // username taken
      // if registering, do nothing.
      if (register) {
        setSuccessMessage('');
        setErrorMessage('Username already taken');
      } else {
        // checking if passwords match
        const hashedPassword = await hashPassword(passwordValue);
        if (qSnap.docs[0].data().password === hashedPassword) {
          setUser(qSnap.docs[0].data().username);
        } else {
          setSuccessMessage('');
          setErrorMessage('Invalid credentials. Please try again.');
        }
      }
      // if loging in, check if username exists and if passwords match
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col justify-evenly items-center h-88 w-96 bg-gray-100 rounded-lg">
          <h1 className="text-xl ">{register ? 'Register' : 'Login'}</h1>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-8 mb-4"
          >
            <input
              type="text"
              value={formValue}
              name="username"
              autoComplete="on"
              onChange={handleFormChange}
              placeholder="Username"
              className="w-60 h-8 px-4 rounded"
            />
            <input
              type="password"
              value={passwordValue}
              name="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              className="w-60 h-8 px-4 rounded"
            />
            <button
              className="bg-orange-500 text-white w-60 h-8 rounded-sm mt-4"
              type="submit"
            >
              {register ? 'Register' : 'Login'}
            </button>
          </form>
          {errorMessage && (
            <div className="text-red-500 text-md">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-md">{successMessage}</div>
          )}
        </div>
        <div className="w-96 h-32 mt-10 flex justify-center gap-10 items-center bg-gray-100 rounded-lg">
          {!register && (
            <Image
              src={'/register_icon.png'}
              alt="register"
              width={80}
              height={80}
            />
          )}
          <div className="flex flex-col items-center">
            <div>{register ? 'Already have an account?' : 'No account?'}</div>
            <button className="underline" onClick={handleSwapButtonClick}>
              {register ? 'Log in here' : 'Create one here.'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
