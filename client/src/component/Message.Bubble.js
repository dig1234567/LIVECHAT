import React, { useState } from "react";
import "./MessageBubble.css";

const MessageBubble = ({
  message,
  username,
  deleteMessage,
  editMessage,
  setPreviewImage,
  setReplyMessage,
}) => {
  const [isHover, setIsHover] = useState(false); // 預設滑鼠沒有移動
  if (!message) return null;
  if (message.system) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "12px",
          margin: "10px 0",
          background: "#f0f0f0",
          padding: "5px 10px",
          borderRadius: "10px",
        }}
      >
        📢 {message.text}
      </div>
    );
  }

  const isMe = message.user === username;

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        alignItems: "flex-start",
        gap: 10,
        marginBottom: 16,
      }}
    >
      {!isMe && (
        <div className="avatar">{message.user?.[0]?.toUpperCase()}</div>
      )}
      <div
        className={`message-bubble ${isMe ? "my-message" : "other-message"}`}
        style={{
          backgroundColor: isMe ? "#4f8cff" : "#fff",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#666",
            marginBottom: 8,
          }}
        >
          {message.user}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        ></div>

        {message.replyTo && (
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "6px 8px",
              borderRadius: 8,
              marginBottom: 8,
              fontSize: 12,
              borderLeft: "3px solid #ffffff66",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              ↩ {message.replyTo.user}
            </div>

            <div
              style={{
                opacity: 0.8,
              }}
            >
              {message.replyTo.text ||
                (message.replyTo.imageUrl ? "📷 圖片" : "")}
            </div>
          </div>
        )}

        <div>
          {message.text && (
            <div>
              {message.text}

              {message.edited && (
                <span
                  style={{
                    fontSize: 10,
                    color: "#888",
                    marginLeft: 6,
                  }}
                >
                  (已編輯)
                </span>
              )}
            </div>
          )}

          {message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="聊天室圖片"
              onClick={() => setPreviewImage(message.imageUrl)}
              style={{
                maxWidth: "250px",
                maxHeight: "250px",
                borderRadius: 10,
                marginTop: 8,
                cursor: "pointer",
                display: "block",
              }}
            />
          )}
        </div>

        {isHover && (
          <div
            style={{
              display: "flex",
              gap: 5,
            }}
          >
            <button
              onClick={() => setReplyMessage(message)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              💬
            </button>

            {isMe && (
              <>
                <button
                  onClick={() => editMessage(message._id, message.text)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  ✏️
                </button>

                <button
                  onClick={() => deleteMessage(message._id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        )}
        <div
          style={{
            fontSize: 10,
            color: "#999",
            textAlign: "right",
            marginTop: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 6,
              marginTop: 6,
              fontSize: 10,
              color: isMe ? "#e0e0e0" : "#888",
            }}
          >
            {message.readBy?.length > 0 && (
              <span>✓ 已讀 {message.readBy.length}</span>
            )}

            <span>{message.time}</span>
          </div>
        </div>
      </div>
      {isMe && <div className="avatar">{message.user?.[0]?.toUpperCase()}</div>}
    </div>
  );
};

export default MessageBubble;
