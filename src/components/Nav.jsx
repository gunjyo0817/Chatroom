import {BellIcon} from "@heroicons/react/24/outline";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Fragment} from "react";
import Link from "next/link";
import {classNames} from "@/utils/style";
import useAuth from "@/hooks/useAuth";

export default function Nav() {
    const user = useAuth()
    return (
        <header className="shrink-0 bg-[#0b2545]">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="/home">
                    <img
                        className="h-12 w-auto rounded-full cursor-pointer"
                        src="../logo.png"
                        alt="ChatRoom"
                    />
                </a>

                <div className="flex items-center gap-x-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                        <span className="sr-only">View notifications</span>
                        <BellIcon onClick={()=>Notification.requestPermission()}
                            className="h-6 w-6" aria-hidden="true"/>
                    </button>
                    <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full bg-gray-50"
                                src={user?.photoURL}
                                alt=""
                            />
                            <span className="hidden lg:flex lg:items-center">
                                          <span className="ml-4 text-sm font-semibold leading-6 text-white"
                                                aria-hidden="true">
                                            {user?.email}
                                          </span>
                                          <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            href="/profile"
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                            )}
                                        >
                                            Your Profile
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </header>
    )
}