import React, { useState } from "react";
import axios from "axios";
import SNS_API from "../../utils/urls";
const EmailSender = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = async () => {
    setIsSending(true);

    try {
      const response = await axios.post(SNS_API, email);

      console.log("API Result:", response.data);
      if (response.ok) {
        setIsSent(true);
      } else {
        // Handle error scenario
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error(error);
    }

    setIsSending(false);
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter email"
      />
      <button onClick={handleSendEmail} disabled={isSending}>
        {isSending ? "Sending..." : isSent ? "Email Sent!" : "Send Email"}
      </button>
    </div>
  );
};

export default EmailSender;
