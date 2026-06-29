import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({
  message,
  setMessage,
  sendMessage,
  sendImage,
  room,
  username,
  socket,
}) => {
  const [showEmoji, setShowEmoji] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        position: "relative",
      }}
    >
      {showEmoji && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50px",
            zIndex: 999,
          }}
        >
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setMessage((prev) => prev + emojiData.emoji);
              setShowEmoji(false);
            }}
          />
        </div>
      )}
      <label
        style={{
          cursor: "pointer",
          fontSize: 24,
        }}
      >
        📷
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            console.log("選到圖片");

            sendImage(e.target.files[0]);
          }}
        />
      </label>
      <button
        onClick={() => setShowEmoji(!showEmoji)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: 24,
        }}
      >
        😊
      </button>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);

          // typing
          socket.emit("typing", {
            room,
            user: username,
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        placeholder="輸入訊息..."
        style={{
          flex: 1,
          padding: 12,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 16,
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "12px 16px",
          borderRadius: 8,
          border: "none",
          backgroundColor: "#2196f3",
          color: "white",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        送出
      </button>
    </div>
  );
};

export default MessageInput;
