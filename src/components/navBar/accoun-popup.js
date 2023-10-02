"use client";

const AccountPopup = ({
  setPageLoader,
  loggedInAccount,
  setLoggedInAccount,
  setAccount,
  account,
  signOut,
}) => {
  return (
    <div className="py-8 px-8 fixed top-[50px] gap-3 flex flex-col items-start right-[45px] bg-black opacity-[.85] z-[999]">
      <div className="flex flex-col gap-3 ">
        {account && account.length
          ? account
              .filter((item) => item._id !== loggedInAccount._id)
              .map((filterAccount) => (
                <div
                  className="cursor-pointer flex gap-5 "
                  key={filterAccount._id}
                  onClick={() => {
                    setLoggedInAccount(null);
                    sessionStorage.removeItem("loggedInAccount");
                  }}
                >
                  <img
                    src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                    alt="Current Profile"
                    className="rounded max-w-[30px] min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                  />
                  <p className="mb-4">{filterAccount.name}</p>
                </div>
              ))
          : null}
      </div>
      <div className="">
        <button
          className=""
          onClick={() => {
            setPageLoader(true);
            signOut();
            setLoggedInAccount(null);
            sessionStorage.removeItem("loggedInAccount");
          }}
        >
          Sign out of Netflix
        </button>
      </div>
    </div>
  );
};

export default AccountPopup;
