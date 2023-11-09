import React, { useState } from 'react';

const Modal: React.FC<{ isWishing: boolean, handleConfirm: () => void, handleCancel: () => void }> = ({ isWishing, handleConfirm, handleCancel }) => {
  const wishingText = "Switching to Gifting mode will allow you to view other people's Wishlists, browse products, and fulfill requests!";
  const giftingText = "Switching to Wishing Mode will allow you to create your own Wishlists and share them with your friends!";
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Switch to {isWishing ? 'Gifting' : 'Wishing'}?</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{isWishing ? wishingText : giftingText}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={handleConfirm} type="button" className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${isWishing ? 'bg-teal-600' : 'bg-amber-600'} text-base font-medium text-white ${isWishing ? 'hover:bg-amber-600' : 'hover:bg-teal-600'} sm:ml-3 sm:w-auto sm:text-sm`}>
              Switch
            </button>
            <button onClick={handleCancel} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Toggle: React.FC = () => {
  const [isWishing, setIsWishing] = useState(true);
  const [isLoggedInUser, setIsLoggedInUser] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setIsWishing(!isWishing);
    setShowModal(false);
  };

  const handleCancel = () => {
    setIsWishing(isWishing);
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleToggle} className="inline-flex pt-1 items-center rounded-md cursor-pointer dark:text-gray-800">
        <span className={`px-4 py-2 rounded-l-md ${isWishing ? 'bg-teal-600' : 'bg-gray-400'} text-white font-bold`}>WISHING</span>
        <span className={`px-4 py-2 rounded-r-md ${isWishing ? 'bg-gray-400' : 'bg-amber-600'} text-white font-bold`}>GIFTING</span>
      </button>
      {showModal && (
        <Modal isWishing={isWishing} handleConfirm={handleConfirm} handleCancel={handleCancel} />
      )}
    </>
  );
};

const Card: React.FC<{ number: number, title: string }> = ({ number, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="text-3xl font-bold mb-2 text-center">{number}</div>
      <div className="text-lg text-gray-500 text-center">{title}</div>
    </div>
  );
};

const Profile: React.FC = () => {
  return (
    <div className='container bg-pink m-auto ps-8 pe-8 pt-8 mb-8 max-w-4xl'>
      {/*Header*/}
      <div className='flex justify-between items-start mb-6'>
        <div>
          <h1 className='text-5xl font-medium mb-1'>Hunter Groff</h1>
          <h3 className='text-2xl text-gray-500 font-medium'>@username</h3>
          <h4></h4>
        </div>
        <Toggle />
      </div>


      {/* Personal Info */}
      <div className='mb-8'>
        <p className='w-20 inline-block font-bold'>Email:</p>
        <p className='inline-block mb-2'>huntergroff22@gmail.com</p>
        <br/>
        <p className='w-20 inline-block font-bold'>Phone #:</p>
        <p className='inline-block mb-2'>802-598-8758</p>
        <br/>
        <button className='underline text-gray-500'>Edit Profile</button>
      </div>

      <hr />

      {/*Cards*/}
      <div className='mt-8'>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Card number={3} title='Wishlists' />
          <Card number={0} title='Gifts' />
          <Card number={5} title='Following' />
          <Card number={2} title='Followers' />
        </div>
      </div>

    </div>
  );
};

export default Profile;