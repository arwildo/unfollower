"use client";

import { useState } from "react";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [unfollowers, setUnfollowers] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState(false);
  const [followerFileName, setFollowerFileName] = useState<string>("");
  const [followingFileName, setFollowingFileName] = useState<string>("");

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setData: React.Dispatch<React.SetStateAction<string[]>>,
    setFileName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (content) {
        const data = JSON.parse(content.toString());
        const parsed = Array.isArray(data)
          ? data.flatMap((item) =>
              item.string_list_data?.map((entry: { value: string }) => entry.value)
            )
          : data.relationships_following.flatMap((item: any) =>
              item.string_list_data?.map((entry: { value: string }) => entry.value)
            );
        setData(parsed);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (followers.length === 0 || following.length === 0) {
      setShowModal(true);
    } else {
      const unfollowed = following.filter((person) => !followers.includes(person));
      setUnfollowers(unfollowed);
      setFilesUploaded(true);
    }
  };

  return (
    <div className="bg-pink-200">
      <div className="flex flex-col md:flex-row h-screen bg-pink-200 p-8 md:px-14">
        {/* Left Section */}
        <div className="lg:w-1/3 w-full lg:h-full p-8 bg-pink-200 relative flex flex-col justify-center items-start">
          <div
            className="absolute inset-0 z-0 bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('images/hand_circle.png')" }}
          />
        </div>

        {/* Right Section */}
        <div className="lg:w-2/3 w-full flex items-center justify-center">
          <div className="relative bg-white text-black rounded-[2rem] shadow-lg max-w-[375px] w-full aspect-[9/19.5] flex flex-col items-center justify-between overflow-hidden border-8 border-gray-800">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black h-6 w-32 rounded-b-full z-10"></div>
            
            {/* Content */}
            <div className="p-8 w-full flex-1 flex flex-col items-left">
              <div className="mt-4 mb-8">
                <FaInstagram className="text-pink-500 text-3xl" />
                <h1 className="text-2xl font-bold mb-4 text-gray-900 z-10 my-4">
                  Instagram Unfollowers
                </h1>
                <p className="text-md text-gray-500 z-10 text-left">
                  Liat orang yang tidak follow kita dan juga orang yang unfollow kita di Instagram ✌
                </p>
              </div>
              <div className="w-full">
                <label className="block text-md font-medium mb-2">Followers</label>
                <div className="relative">
                  <label
                    htmlFor="followers"
                    className="block w-full px-4 py-2 text-center bg-pink-400 text-white font-medium rounded-full cursor-pointer hover:bg-pink-600 transition"
                  >
                    {followerFileName || "Choose File"}
                  </label>
                  <input
                    id="followers"
                    type="file"
                    accept=".json"
                    onChange={(e) => handleFileUpload(e, setFollowers, setFollowerFileName)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <div className="w-full mt-6">
                <label className="block text-md font-medium mb-2">Following</label>
                <div className="relative">
                  <label
                    htmlFor="following"
                    className="block w-full px-4 py-2 text-center bg-pink-400 text-white font-medium rounded-full cursor-pointer hover:bg-pink-600 transition"
                  >
                    {followingFileName || "Choose File"}
                  </label>
                  <input
                    id="following"
                    type="file"
                    accept=".json"
                    onChange={(e) => handleFileUpload(e, setFollowing, setFollowingFileName)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-black text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all group mt-6"
              >
                Submit
                <span
                  className="opacity-0 transform translate-x-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ease-in-out"
                >
                  →
                </span>
              </button>
            </div>

            {/* Unfollowers List */}
            {filesUploaded && (
              <div className="p-4 w-full bg-gray-100 overflow-y-auto max-h-[300px]">
                <h2 className="text-xl font-semibold mb-4 text-center">Unfollowers 👇</h2>
                <ul className="space-y-2">
                  {unfollowers.map((person, idx) => (
                    <li key={idx}>
                      <a
                        href={`https://www.instagram.com/${person}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        @{person}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Upload filenya dulu..</h2>
              <p className="text-gray-600 mb-6">
                Upload file <b>following</b> dan <b>followers</b>-nya dulu sebelum submit ya.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="text-center mt-8 text-gray-700 flex justify-center">
        <a href="https://arwildo.com" target="_blank" className="mb-4 mx-auto">
          <img 
            src="images/arwildo-software-cr.svg" 
            alt="Arwildo Software Logo" 
            className="w-28 h-auto" 
          />
        </a>
      </div>
    </div>
  );
}