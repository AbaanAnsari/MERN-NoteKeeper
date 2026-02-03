import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const PasswordInput = ({ value, onChange}) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Password</span>
            </label>
            <div className="flex items-center input input-bordered">

                <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent py-3 mr-3 rounded outline-none"
                    value={value}
                    onChange={onChange}
                />

                {isShowPassword ? <FaRegEye
                    size={22}
                    className="text-primary cursor-pointer"
                    onClick={() => toggleShowPassword()}
                /> : <FaRegEyeSlash
                    size={22}
                    className="text-primary cursor-pointer"
                    onClick={() => toggleShowPassword()}
                />}
            </div>
        </div>
    )
}

export default PasswordInput