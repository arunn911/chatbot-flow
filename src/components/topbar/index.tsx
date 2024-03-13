import { Disclosure } from "@headlessui/react";
import { useContext } from "react";
import TopbarContext from "../../context/provider";

const Topbar = () => {
  const [topbar] = useContext(TopbarContext);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="" src="/assets/logo.svg" alt="Your Company" />
              </div>
            </div>
            <div className="top-bar-btns">{topbar}</div>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Topbar;
