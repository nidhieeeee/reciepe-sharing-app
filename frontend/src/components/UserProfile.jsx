import React, { useEffect } from "react";
import { Mail, Phone, User, Info, UserCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function UserProfile({data}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!data) {
            navigate("/signup");
        }
    }, [data, navigate]);

    return (
        <div className="bg-gray-100">
            <Navbar />
            <div className="flex justify-center items-center h-125  p-6">
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="flex items-center p-6 bg-emerald-500 text-white">
                        <img
                            src="https://i.ibb.co/6JbYffJM/Pink-and-Cream-Colorful-Instagram-Profile-Picture.png"
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-white object-cover"
                        />
                        <div className="ml-6">
                            <h2 className="text-3xl font-bold">{data?.name || "User Name"}</h2>
                            <p className="text-lg text-gray-300">{data?.bio || "A short bio about the user."}</p>
                        </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">User Information</h3>
                            <div className="flex items-center space-x-3 text-gray-700 mb-3">
                                <User className="text-gray-600" />
                                <p>{data?.username || "Username"}</p>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-700 mb-3">
                                <Mail className="text-gray-600" />
                                <p>{data?.email || "example@example.com"}</p>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-700 mb-3">
                                <Phone className="text-gray-600" />
                                <p>{data?.phone || "+123 456 7890"}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h3>
                            <div className="flex items-center space-x-3 text-gray-700 mb-3">
                                <UserCheck className="text-gray-600" />
                                <p>{data?.role || "Role not specified"}</p>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-700">
                                <Info className="text-gray-600" />
                                <p>{data?.bio || "No additional information provided."}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserProfile;
