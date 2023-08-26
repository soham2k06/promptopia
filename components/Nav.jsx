"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

function Nav() {
  const { data: session } = useSession();

  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);
  return (
    <nav
      className="flex-between w-full 
    mb-16 pt-3"
    >
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>

            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt={session?.user.name}
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((proivder) => (
                <button
                  className="black_btn"
                  key={proivder.name}
                  onClick={signIn}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation  */}
      <div className="sm:hidden flex">
        {session?.user ? (
          <>
            <Image
              src={session?.user.image}
              alt={session?.user.name}
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              onMouseEnter={() => setToggleDropDown(true)}
              onMouseLeave={() => setToggleDropDown(false)}
            />
            {toggleDropDown && (
              <div
                className="dropdown"
                onMouseEnter={() => setToggleDropDown(true)}
                onMouseLeave={() => setToggleDropDown(false)}
              >
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  onClick={() => setToggleDropDown(false)}
                  className="dropdown_link"
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  className="black_btn w-full mt-5"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

export default Nav;
