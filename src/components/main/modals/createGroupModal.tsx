"use client";
import React from "react";

import { useState } from "react";
import { Modal } from "flowbite-react";
import Image from "next/image";

const CreateGroupModal = () => {
  const [openModal, setOpenModal] = useState(true);
  return (
    <div className=" font-Maxeville">
      <button
        className="pl-3 pr-3 border-2 border-black rounded-full"
        onClick={() => setOpenModal(true)}
      >
        NEW GROUP
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="text-center text-gray-400">
          CREATE A NEW GROUP
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <label>GROUP NAME</label>
              <input
                type="text"
                className="w-1/2 rounded-full border border-black"
                placeholder='E.G. "TOP ARTISTS" '
              />
            </div>
            <div>
              <label>GROUP DESCRIPTION</label>
              <textarea
                rows={4}
                className="border-2 border-black outline-none"
                placeholder="Write a description..."
              />
            </div>
            <div>
              <label>ADD MEMBERS</label>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-500 aspect-square rounded-full">
                  <Image
                    alt="temp"
                    src="/temp.jpg"
                    className="w-full h-full rounded-full"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-[#322A44] text-white rounded-full pl-4 pr-4 w-1/2 text-lg">
            CREATE GROUP
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateGroupModal;
