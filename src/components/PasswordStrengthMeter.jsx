import { Check, X } from "lucide-react";
import React from "react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "At least one uppercase letter", met: password.match(/[A-Z]/) },
    { label: "At least one lowercase letter", met: password.match(/[a-z]/) },
    { label: "At least one number", met: password.match(/[\d]/) },
    {
      label: "At least one special character",
      met: password.match(/[^A-Za-z-0-9]/),
    },
  ];
  return (
    <div className="mt-2 space-y-1 ">
      {criteria.map((c, i) => {
        return (
          <div key={c.label} className="flex  items-center text-sm">
            {c.met ? (
              <Check className="size-4 text-green-500 mr-2" />
            ) : (
              <X className="size-4 text-red-500 mr-2" />
            )}
            <span
              className={ClipboardItem.met ? `text-green-500` : `text-gray-600`}
            >
              {c.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const PasswordStrengthMeter = ({ password = "" }) => {
  const getStrength = (pass) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;

    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^A-Za-z-9]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getColor = (strength) => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-yellow-300";
      case 4:
        return "bg-green-500";
    }
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
    }
  };
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1 ">
        <span className="text-xs text-gray-400 ">Password strength</span>
        <span className="text-xs text-gray-400  ">
          {getStrengthText(strength)}
        </span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => {
          return (
            <div
              key={index}
              className={`h-1 w-1/4 transition-colors duration-300  rounded-full ${
                index < strength ? getColor(strength) : "bg-gray-600"
              }`}
            />
          );
        })}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
